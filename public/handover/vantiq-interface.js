/**
 * vantiq-interface.js
 * Sitewide, framework-free interactivity for the Vantiq Community Portal
 * WordPress rebuild: accordions, the off-canvas nav drawer, pop-out menus,
 * and modal dialogs. Plain JS, zero dependencies, no build step.
 *
 * Interface only — no content, no data, no fetching. Anything a specific
 * page needs beyond this (search, sort, filter) belongs in its own
 * vantiq-<page>.js, loaded after this file. That split is deliberate: this
 * file is safe to enqueue sitewide and forget about; page-specific files
 * are the ones that change per page.
 *
 * Everything is driven by data attributes, so PHP templates never need to
 * open this file:
 *
 *   <div data-vq-accordion>
 *     <div class="vq-nav__group">
 *       <a class="vq-nav__link" href="/sales-hub/">Sales Hub</a>
 *       <button class="vq-nav__toggle" data-vq-accordion-trigger
 *               aria-expanded="false" aria-controls="nav-sales">
 *         <svg>...</svg>
 *       </button>
 *     </div>
 *     <div class="vq-nav__sub" id="nav-sales" data-vq-accordion-panel
 *          data-vq-slide hidden>...</div>
 *   </div>
 *
 *   <div data-vq-menu>
 *     <button data-vq-menu-trigger aria-expanded="false">...</button>
 *     <div class="vq-menu__panel" data-vq-menu-panel hidden>...</div>
 *   </div>
 *
 *   <div data-vq-drawer="nav">...</div>              <!-- the panel -->
 *   <button data-vq-drawer-open="nav">Open menu</button>
 *
 *   <div data-vq-dialog id="search-dialog">...</div>  <!-- the panel -->
 *   <button data-vq-dialog-open="search-dialog">Search</button>
 *
 * Call VantiqInterface.init(container) after injecting new markup (e.g. an
 * AJAX-loaded fragment) — it re-scans and is idempotent, so calling it
 * again on already-bound elements is safe and won't double-bind handlers.
 *
 * Enqueue once, sitewide, with `defer` — see HANDOVER.md.
 *
 * Version: 1.0.0 — 2026-08-14
 */
(function () {
  "use strict";

  var BOUND_ATTR = "data-vq-bound";

  function alreadyBound(el) {
    return el.hasAttribute(BOUND_ATTR);
  }
  function markBound(el) {
    el.setAttribute(BOUND_ATTR, "");
  }

  // ============================================================ Accordion
  // jQuery is detected, never required: if it's present (as it already is
  // sitewide on this install), panels marked data-vq-slide animate with
  // slideDown/slideUp. Without jQuery, the same panels still work, they
  // just toggle instantly via the `hidden` attribute — load order can
  // never break the sidebar either way.
  //
  // Known jQuery gotcha, handled here: slideUp() leaves an inline
  // `display: none` on the element that outranks the `[hidden]` attribute
  // and re-opening via `hidden = false` alone would leave the panel stuck
  // closed on a second use. This code clears that inline style explicitly
  // before re-opening.
  function initAccordions(root) {
    var triggers = root.querySelectorAll("[data-vq-accordion-trigger]");
    triggers.forEach(function (trigger) {
      if (alreadyBound(trigger)) return;
      markBound(trigger);

      var panelId = trigger.getAttribute("aria-controls");
      var panel = panelId
        ? document.getElementById(panelId)
        : trigger.closest("[data-vq-accordion]")?.querySelector("[data-vq-accordion-panel]");
      if (!panel) return;

      trigger.addEventListener("click", function () {
        var isOpen = trigger.getAttribute("aria-expanded") === "true";
        setAccordionState(trigger, panel, !isOpen);
      });
    });
  }

  function setAccordionState(trigger, panel, open) {
    trigger.setAttribute("aria-expanded", open ? "true" : "false");

    var useSlide = panel.hasAttribute("data-vq-slide") && typeof window.jQuery === "function";
    var eventName = open ? "vq:accordion:open" : "vq:accordion:close";

    if (useSlide) {
      var $panel = window.jQuery(panel);
      if (open) {
        panel.style.display = ""; // clear any stale inline display from a prior slideUp
        panel.hidden = false;
        $panel.hide().slideDown(200);
      } else {
        $panel.slideUp(200, function () {
          panel.hidden = true;
        });
      }
    } else {
      panel.hidden = !open;
    }

    panel.dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
  }

  // ================================================================ Menu
  // Pop-out menus (globe/language, notifications, account). Opens on
  // trigger click, closes on outside click, Escape, or re-clicking the
  // trigger. Only one menu open at a time.
  var openMenu = null;

  function closeMenu(menu) {
    var trigger = menu.querySelector("[data-vq-menu-trigger]");
    var panel = menu.querySelector("[data-vq-menu-panel]");
    if (!trigger || !panel) return;
    trigger.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    if (openMenu === menu) openMenu = null;
  }

  function openMenuEl(menu) {
    if (openMenu && openMenu !== menu) closeMenu(openMenu);
    var trigger = menu.querySelector("[data-vq-menu-trigger]");
    var panel = menu.querySelector("[data-vq-menu-panel]");
    if (!trigger || !panel) return;
    trigger.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    openMenu = menu;
  }

  function initMenus(root) {
    var menus = root.querySelectorAll("[data-vq-menu]");
    menus.forEach(function (menu) {
      var trigger = menu.querySelector("[data-vq-menu-trigger]");
      if (!trigger || alreadyBound(trigger)) return;
      markBound(trigger);

      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = trigger.getAttribute("aria-expanded") === "true";
        if (isOpen) closeMenu(menu);
        else openMenuEl(menu);
      });
    });
  }

  document.addEventListener("click", function () {
    if (openMenu) closeMenu(openMenu);
  });

  // ============================================================== Drawer
  // Off-canvas nav for narrow viewports. Traps focus while open, locks
  // body scroll, restores both on close.
  var drawerScrollY = 0;
  var drawerLastFocused = null;

  function trapFocus(panel, e) {
    if (e.key !== "Tab") return;
    var focusable = panel.querySelectorAll(
      'a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openDrawer(name) {
    var panel = document.querySelector('[data-vq-drawer="' + name + '"]');
    if (!panel) return;
    var backdrop = panel.previousElementSibling?.hasAttribute("data-vq-drawer-backdrop")
      ? panel.previousElementSibling
      : panel.parentElement.querySelector("[data-vq-drawer-backdrop]");

    drawerLastFocused = document.activeElement;
    drawerScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = "-" + drawerScrollY + "px";
    document.body.style.width = "100%";

    panel.setAttribute("data-open", "true");
    panel.hidden = false;
    if (backdrop) backdrop.setAttribute("data-open", "true");

    var firstFocusable = panel.querySelector(
      'a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) firstFocusable.focus();

    function onKeydown(e) {
      if (e.key === "Escape") closeDrawer(name);
      trapFocus(panel, e);
    }
    panel.__vqKeydown = onKeydown;
    document.addEventListener("keydown", onKeydown);
  }

  function closeDrawer(name) {
    var panel = document.querySelector('[data-vq-drawer="' + name + '"]');
    if (!panel) return;
    var backdrop = panel.previousElementSibling?.hasAttribute("data-vq-drawer-backdrop")
      ? panel.previousElementSibling
      : panel.parentElement.querySelector("[data-vq-drawer-backdrop]");

    panel.setAttribute("data-open", "false");
    if (backdrop) backdrop.setAttribute("data-open", "false");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, drawerScrollY);

    if (panel.__vqKeydown) {
      document.removeEventListener("keydown", panel.__vqKeydown);
      panel.__vqKeydown = null;
    }
    if (drawerLastFocused && drawerLastFocused.focus) drawerLastFocused.focus();
  }

  function initDrawers(root) {
    root.querySelectorAll("[data-vq-drawer-open]").forEach(function (btn) {
      if (alreadyBound(btn)) return;
      markBound(btn);
      btn.addEventListener("click", function () {
        openDrawer(btn.getAttribute("data-vq-drawer-open"));
      });
    });
    root.querySelectorAll("[data-vq-drawer-close]").forEach(function (btn) {
      if (alreadyBound(btn)) return;
      markBound(btn);
      btn.addEventListener("click", function () {
        closeDrawer(btn.getAttribute("data-vq-drawer-close"));
      });
    });
    root.querySelectorAll("[data-vq-drawer-backdrop]").forEach(function (backdrop) {
      if (alreadyBound(backdrop)) return;
      markBound(backdrop);
      backdrop.addEventListener("click", function () {
        var panel = backdrop.nextElementSibling;
        var name = panel && panel.getAttribute("data-vq-drawer");
        if (name) closeDrawer(name);
      });
    });
  }

  // ============================================================== Dialog
  // Same focus-trap/scroll-lock contract as the drawer, plus autofocus on
  // open (the first [data-vq-dialog-autofocus] element, or the panel
  // itself) and reduced-motion respected via the CSS transition (no JS
  // motion here to gate).
  function openDialog(id) {
    var panel = document.getElementById(id);
    if (!panel) return;
    var backdrop = panel.previousElementSibling?.hasAttribute("data-vq-dialog-backdrop")
      ? panel.previousElementSibling
      : panel.parentElement.querySelector("[data-vq-dialog-backdrop]");

    drawerLastFocused = document.activeElement;
    document.body.style.overflow = "hidden";

    panel.setAttribute("data-open", "true");
    panel.hidden = false;
    if (backdrop) backdrop.setAttribute("data-open", "true");

    var autofocusTarget = panel.querySelector("[data-vq-dialog-autofocus]") || panel;
    if (autofocusTarget.focus) autofocusTarget.focus();

    function onKeydown(e) {
      if (e.key === "Escape") closeDialog(id);
      trapFocus(panel, e);
    }
    panel.__vqKeydown = onKeydown;
    document.addEventListener("keydown", onKeydown);
  }

  function closeDialog(id) {
    var panel = document.getElementById(id);
    if (!panel) return;
    var backdrop = panel.previousElementSibling?.hasAttribute("data-vq-dialog-backdrop")
      ? panel.previousElementSibling
      : panel.parentElement.querySelector("[data-vq-dialog-backdrop]");

    panel.setAttribute("data-open", "false");
    if (backdrop) backdrop.setAttribute("data-open", "false");
    document.body.style.overflow = "";

    if (panel.__vqKeydown) {
      document.removeEventListener("keydown", panel.__vqKeydown);
      panel.__vqKeydown = null;
    }
    if (drawerLastFocused && drawerLastFocused.focus) drawerLastFocused.focus();
  }

  function initDialogs(root) {
    root.querySelectorAll("[data-vq-dialog-open]").forEach(function (btn) {
      if (alreadyBound(btn)) return;
      markBound(btn);
      btn.addEventListener("click", function () {
        openDialog(btn.getAttribute("data-vq-dialog-open"));
      });
    });
    root.querySelectorAll("[data-vq-dialog-close]").forEach(function (btn) {
      if (alreadyBound(btn)) return;
      markBound(btn);
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-vq-dialog-close") || btn.closest("[data-vq-dialog]")?.id;
        if (id) closeDialog(id);
      });
    });
    root.querySelectorAll("[data-vq-dialog-backdrop]").forEach(function (backdrop) {
      if (alreadyBound(backdrop)) return;
      markBound(backdrop);
      backdrop.addEventListener("click", function () {
        var panel = backdrop.nextElementSibling;
        if (panel && panel.id) closeDialog(panel.id);
      });
    });
  }

  // ================================================================ Init
  function init(container) {
    var root = container || document;
    initAccordions(root);
    initMenus(root);
    initDrawers(root);
    initDialogs(root);
  }

  window.VantiqInterface = { init: init, openDrawer: openDrawer, closeDrawer: closeDrawer, openDialog: openDialog, closeDialog: closeDialog };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(document); });
  } else {
    init(document);
  }
})();
