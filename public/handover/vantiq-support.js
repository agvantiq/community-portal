/**
 * vantiq-support.js
 * Page-specific interactivity for the Contact Support form: switching the
 * fields by reason and deployment, the "details" field behind each checked
 * interface, and the file picker (drag-and-drop, remove, limits). Load after
 * vantiq-interface.js, on the Contact Support page only. Plain JS, zero
 * dependencies, no build step, never fetches or submits anything itself.
 *
 * The markup is in support-form.html (generated from lib/support-form.json,
 * the same field map the mockup uses). Copy the whole <form> into the PHP
 * template and point its action at your handler. It's an ordinary
 * multipart form, so a normal submit (or new FormData(form) in an AJAX
 * handler) carries every field plus the files as `attachments[]`.
 *
 * What it does, all driven by data attributes:
 *
 *   <form data-vq-support-form ...>
 *     Reason radios (name="reason"):
 *       <input type="radio" name="reason" value="technical">
 *     Shown only for some reasons (space-separated values):
 *       <div data-vq-reasons="technical bug-report">…</div>
 *       <div data-vq-not-reasons="technical bug-report">…</div>
 *     Deployment radios (name="deployment"), and blocks per deployment:
 *       <fieldset data-vq-deployments="private edge">…</fieldset>
 *       <p data-vq-no-deployment>Choose a deployment…</p>   ← until one is picked
 *     A checkbox that reveals a details field:
 *       <input type="checkbox" data-vq-reveal="support-ui_ios"> … <input id="support-ui_ios" hidden>
 *     The file picker:
 *       <label data-vq-dropzone> … <input type="file" name="attachments[]" multiple
 *              data-vq-files data-vq-max-files="10" data-vq-max-total-mb="20" accept="…"></label>
 *       <p data-vq-files-error hidden></p>  <ul data-vq-filelist></ul>
 *
 * The one rule behind all the switching: anything inside a [hidden] element
 * is also disabled. Disabled controls are skipped by the browser's required-
 * field check and left out of the submission, so the form only ever submits
 * the fields that apply. Nothing is cleared on a switch: a user who flips
 * from Edge to Private Cloud and back finds their Edge answers still there,
 * and shared fields (customer, problem description, etc.) never move.
 *
 * This file is required on the page. Without it every block shows at once
 * and every required field of all three deployments (and the message box)
 * is required together, so the form can't be sent.
 *
 * VantiqSupport.init(container) re-scans injected content; it's idempotent.
 *
 * Version: 1.4.1 — 2026-10-21
 */
(function () {
  "use strict";

  var CONTROLS = "input, select, textarea, button";

  function words(value) {
    return (value || "").split(/\s+/).filter(Boolean);
  }

  function checkedValue(form, name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : null;
  }

  function update(form) {
    var reason = checkedValue(form, "reason");
    var deployment = checkedValue(form, "deployment");

    // An element can carry several conditions (e.g. a reason AND a
    // deployment); it shows only when all of them pass.
    var CONDITIONS = "[data-vq-reasons], [data-vq-not-reasons], [data-vq-deployments], [data-vq-no-deployment]";
    form.querySelectorAll(CONDITIONS).forEach(function (el) {
      var show = true;
      if (el.hasAttribute("data-vq-reasons"))
        show = show && words(el.getAttribute("data-vq-reasons")).indexOf(reason) !== -1;
      if (el.hasAttribute("data-vq-not-reasons"))
        show = show && words(el.getAttribute("data-vq-not-reasons")).indexOf(reason) === -1;
      if (el.hasAttribute("data-vq-deployments"))
        show = show && !!deployment && words(el.getAttribute("data-vq-deployments")).indexOf(deployment) !== -1;
      if (el.hasAttribute("data-vq-no-deployment"))
        show = show && !deployment;
      el.hidden = !show;
    });
    form.querySelectorAll("[data-vq-reveal]").forEach(function (box) {
      var target = document.getElementById(box.getAttribute("data-vq-reveal"));
      if (target) target.hidden = !box.checked;
      box.setAttribute("aria-expanded", String(box.checked));
    });

    // The one rule: hidden means disabled.
    form.querySelectorAll(CONTROLS).forEach(function (control) {
      var hiddenAncestor = control.closest("[hidden]");
      control.disabled = !!(hiddenAncestor && form.contains(hiddenAncestor));
    });
  }

  // ---- Files -----------------------------------------------------------

  var ICON_CLIP =
    '<svg class="vq-filelist__clip" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>';
  var ICON_X =
    '<svg class="vq-filelist__remove-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

  function formatSize(bytes) {
    if (bytes <= 0) return "0 KB";
    return bytes < 1048576
      ? Math.max(1, Math.round(bytes / 1024)) + " KB"
      : (bytes / 1048576).toFixed(1) + " MB";
  }

  function initFiles(form) {
    var input = form.querySelector("[data-vq-files]");
    if (!input) return;
    var list = form.querySelector("[data-vq-filelist]");
    var error = form.querySelector("[data-vq-files-error]");
    var zone = input.closest("[data-vq-dropzone]");
    var maxFiles = parseInt(input.getAttribute("data-vq-max-files"), 10) || 10;
    // One cap on the combined size, checked as each file is added, so an
    // oversized submission never reaches the server. 20 MB leaves headroom
    // for base64 encoding (~1.37x) inside the handler's request limits.
    var maxTotalMb = parseFloat(input.getAttribute("data-vq-max-total-mb")) || 20;
    var maxTotalBytes = maxTotalMb * 1048576;
    var accepted = words((input.getAttribute("accept") || "").replace(/,/g, " ")).map(function (e) {
      return e.toLowerCase();
    });
    var kept = [];

    function write() {
      // Put the kept list back into the real input so the form submits it.
      var dt = new DataTransfer();
      kept.forEach(function (f) { dt.items.add(f); });
      input.files = dt.files;

      list.innerHTML = "";
      kept.forEach(function (file, i) {
        var li = document.createElement("li");
        li.className = "vq-filelist__item";
        li.innerHTML =
          ICON_CLIP +
          '<span class="vq-filelist__name"></span><span class="vq-filelist__size"></span>' +
          '<button type="button" class="vq-filelist__remove">' + ICON_X + "</button>";
        li.querySelector(".vq-filelist__name").textContent = file.name;
        li.querySelector(".vq-filelist__size").textContent = formatSize(file.size);
        var remove = li.querySelector(".vq-filelist__remove");
        remove.setAttribute("aria-label", "Remove " + file.name);
        remove.addEventListener("click", function () {
          kept.splice(i, 1);
          write();
        });
        list.appendChild(li);
      });
      if (kept.length) {
        var total = kept.reduce(function (sum, f) { return sum + f.size; }, 0);
        var summary = document.createElement("li");
        summary.className = "vq-filelist__item vq-filelist__total";
        summary.setAttribute("aria-live", "polite");
        summary.innerHTML = "<span></span><span></span>";
        summary.children[0].textContent = kept.length + (kept.length === 1 ? " file" : " files");
        summary.children[1].textContent = formatSize(total) + " of " + maxTotalMb + " MB";
        list.appendChild(summary);
      }
    }

    function add(files) {
      var problems = [];
      var total = kept.reduce(function (sum, f) { return sum + f.size; }, 0);
      Array.prototype.forEach.call(files, function (file) {
        var ext = "." + (file.name.split(".").pop() || "").toLowerCase();
        var duplicate = kept.some(function (k) { return k.name === file.name && k.size === file.size; });
        if (duplicate) return;
        if (accepted.length && accepted.indexOf(ext) === -1) problems.push(file.name + ": this file type isn't accepted.");
        else if (kept.length >= maxFiles) problems.push(file.name + ": you can attach up to " + maxFiles + " files.");
        else if (total + file.size > maxTotalBytes)
          problems.push(
            file.name + " (" + formatSize(file.size) + "): would take the total over " + maxTotalMb + " MB. " +
            formatSize(Math.max(0, maxTotalBytes - total)) + " left."
          );
        else {
          kept.push(file);
          total += file.size;
        }
      });
      write();
      if (error) {
        error.hidden = problems.length === 0;
        var text = error.querySelector("[data-vq-files-error-text]") || error;
        text.textContent = problems.join(" ");
      }
    }

    // A fresh pick replaces input.files, so read it, then merge into the list.
    input.addEventListener("change", function () {
      var picked = Array.prototype.slice.call(input.files);
      add(picked);
    });

    if (zone) {
      zone.addEventListener("dragover", function (e) {
        e.preventDefault();
        zone.classList.add("is-dragging");
      });
      zone.addEventListener("dragleave", function () {
        zone.classList.remove("is-dragging");
      });
      zone.addEventListener("drop", function (e) {
        e.preventDefault();
        zone.classList.remove("is-dragging");
        add(e.dataTransfer.files);
      });
    }

    form.addEventListener("reset", function () {
      kept = [];
      setTimeout(function () {
        write();
        if (error) error.hidden = true;
      });
    });
  }

  // ---- Init --------------------------------------------------------------

  function init(container) {
    (container || document).querySelectorAll("[data-vq-support-form]").forEach(function (form) {
      if (form.getAttribute("data-vq-support-ready")) return;
      form.setAttribute("data-vq-support-ready", "1");
      form.addEventListener("change", function () { update(form); });
      form.addEventListener("reset", function () { setTimeout(function () { update(form); }); });
      initFiles(form);
      update(form);
    });
  }

  window.VantiqSupport = { init: init };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(); });
  } else {
    init();
  }
})();
