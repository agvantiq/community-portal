// Regenerates the Contact Support <form> in public/handover/support-form.html
// from lib/support-form.json — the same field map app/support/ renders — so
// the WordPress markup can't drift from the mockup (CLAUDE.md rule 4: derived
// documents are generated, never hand-typed). Icons are read from
// node_modules/lucide-react, so they're the exact paths the mockup draws.
// Run after any change to the field map or the form's markup below:
//
//   node scripts/gen-support-form.mjs
//
// Only the region between the @generated markers is rewritten; the test-page
// chrome around it is maintained by hand.
import { readFileSync, writeFileSync } from "node:fs";

const MAP = JSON.parse(readFileSync("lib/support-form.json", "utf8"));
const TARGET = "public/handover/support-form.html";
const START = "<!-- @generated support-form:start -->";
const END = "<!-- @generated support-form:end -->";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function icon(name, cls) {
  const src = readFileSync(`node_modules/lucide-react/dist/esm/icons/${name}.js`, "utf8");
  const literal = src.slice(src.indexOf("[", src.indexOf("createLucideIcon(")), src.lastIndexOf("]") + 1);
  const nodes = new Function(`return ${literal}`)();
  const inner = nodes
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k}="${esc(v)}"`)
        .join(" ");
      return `<${tag} ${a}/>`;
    })
    .join("");
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

const ALL = MAP.deployments.map((d) => d.id);
const deps = (only) => (only ?? ALL).join(" ");
const req = (f) => (f.required ? " required" : "");
const star = (f) => (f.required ? ' <span class="vq-required" aria-hidden="true">*</span>' : "");

function field(f, pad) {
  const id = `support-${f.name}`;
  const helpId = f.help ? `${id}-help` : null;
  const describedBy = helpId ? ` aria-describedby="${helpId}"` : "";
  // Help that differs by deployment: one span per variant, switched by the
  // same data-vq-deployments rule as everything else.
  const helpText =
    typeof f.help === "object"
      ? Object.entries(f.help).map(([d, t]) => `<span data-vq-deployments="${d}">${esc(t)}</span>`).join("")
      : f.help
        ? esc(f.help)
        : "";
  const help = f.help ? `\n${pad}  <p class="vq-help" id="${helpId}">${helpText}</p>` : "";
  const ph = f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : "";
  const only = f.only ? ` data-vq-deployments="${deps(f.only)}"` : "";
  const full = f.half ? "" : " vq-grid__full";

  if (f.type === "checkbox") {
    return `${pad}<div class="vq-field vq-grid__full"${only}>
${pad}  <label class="vq-check"><input class="vq-check__input" type="checkbox" name="${f.name}" value="yes"${describedBy}> ${esc(f.label)}</label>${help}
${pad}</div>`;
  }
  if (f.type === "check-detail") {
    return `${pad}<!-- Two controls sharing a row: the checkbox marks the interface as
${pad}     affected; the details field beside it appears once it's checked. -->
${pad}<div class="vq-check-detail vq-grid__full">
${pad}  <label class="vq-check"><input class="vq-check__input" type="checkbox" name="${f.name}_selected" value="yes" data-vq-reveal="${id}" aria-controls="${id}" aria-expanded="false"> ${esc(f.label)}</label>
${pad}  <input class="vq-input" id="${id}" name="${f.name}"${ph} aria-label="${esc(f.label)} details" hidden>
${pad}</div>`;
  }
  if (f.type === "radio" || f.type === "checkgroup") {
    const isRadio = f.type === "radio";
    const labelId = `${id}-label`;
    const layout = isRadio ? (f.stacked ? "vq-options--stacked" : "vq-options--inline") : "vq-options--grid";
    const opts = f.options
      .map(
        (o) =>
          `${pad}    <label class="vq-check"><input class="vq-check__input" type="${isRadio ? "radio" : "checkbox"}" name="${
            isRadio ? f.name : `${f.name}[]`
          }" value="${esc(o)}"${isRadio ? req(f) : ""}> ${esc(o)}</label>`
      )
      .join("\n");
    return `${pad}<div class="vq-field${full}"${only} role="${isRadio ? "radiogroup" : "group"}" aria-labelledby="${labelId}">
${pad}  <p class="vq-label${f.hideLabel ? " vq-sr-only" : ""}" id="${labelId}">${esc(f.label)}${star(f)}</p>
${pad}  <div class="vq-options ${layout}">
${opts}
${pad}  </div>${help}
${pad}</div>`;
  }
  let control;
  if (f.type === "textarea") {
    control = `<textarea class="vq-textarea" id="${id}" name="${f.name}" rows="3"${ph}${req(f)}${describedBy}></textarea>`;
  } else if (f.type === "select") {
    const opts = f.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("");
    control = `<select class="vq-select" id="${id}" name="${f.name}"${req(f)}${describedBy}><option value="" disabled selected>Select…</option>${opts}</select>`;
  } else {
    control = `<input class="vq-input" type="${f.type}" id="${id}" name="${f.name}"${ph}${req(f)}${describedBy}>`;
  }
  return `${pad}<div class="vq-field${full}"${only}>
${pad}  <label class="vq-label" for="${id}">${esc(f.label)}${star(f)}</label>
${pad}  ${control}${help}
${pad}</div>`;
}

function section(s, reasons = MAP.issueReasons.join(" "), withDeployments = true) {
  const desc = s.description ? `\n    <p class="vq-help">${esc(s.description)}</p>` : "";
  const depAttr = withDeployments ? ` data-vq-deployments="${deps(s.only)}"` : "";
  return `  <fieldset class="vq-form-section" data-vq-reasons="${reasons}"${depAttr}>
    <legend class="vq-legend">${esc(s.title)}</legend>${desc}
    <div class="vq-grid">
${s.fields.map((f) => field(f, "      ")).join("\n")}
    </div>
  </fieldset>`;
}

const A = MAP.attachments;
const S = MAP.security;
const issue = MAP.issueReasons.join(" ");
const first = MAP.reasons[0];
// Reasons limited to some roles (Security Issue: Vantiq staff) are wrapped
// in staff-only markers: WordPress must print them only for those users.
const STAFF_START = "<!-- staff-only:start — print only for Vantiq employees/admins (HANDOVER.md, \"Security Issue\") -->";
const STAFF_END = "<!-- staff-only:end -->";
const staff = (html, pad = "  ") => `${pad}${STAFF_START}\n${html}\n${pad}${STAFF_END}`;

const form = `${START}
<!--
  Generated by scripts/gen-support-form.mjs from lib/support-form.json.
  Don't edit by hand: change the field map or the script and re-run it.

  Copy everything from <form> to </form> into the Contact Support template.
  Set action (and method/handler) to your own; enctype must stay
  multipart/form-data for the attachments. Field names match the PDF
  templates' own form-field names.
-->
<form class="vq-form" data-vq-support-form method="post" action="" enctype="multipart/form-data">
  <div class="vq-grid">
    <div class="vq-field">
      <label class="vq-label" for="support-first_name">First name <span class="vq-required" aria-hidden="true">*</span></label>
      <input class="vq-input" id="support-first_name" name="first_name" autocomplete="given-name" required>
    </div>
    <div class="vq-field">
      <label class="vq-label" for="support-last_name">Last name <span class="vq-required" aria-hidden="true">*</span></label>
      <input class="vq-input" id="support-last_name" name="last_name" autocomplete="family-name" required>
    </div>
    <div class="vq-field vq-grid__full">
      <label class="vq-label" for="support-email">Email <span class="vq-required" aria-hidden="true">*</span></label>
      <input class="vq-input" type="email" id="support-email" name="email" autocomplete="email" placeholder="you@company.com" required>
    </div>
  </div>

  <fieldset class="vq-choice-group">
    <legend class="vq-label">Reason for inquiry</legend>
    <div class="vq-choices">
${MAP.reasons
  .map(
    (r) => {
      const card = `      <label class="vq-choice">
        <input class="vq-choice__input" type="radio" name="reason" value="${r.value}"${r === first ? " checked" : ""}>
        ${icon(r.icon, "vq-choice__icon")}
        <span class="vq-choice__title">${esc(r.label)}</span>
      </label>`;
      return r.roles ? staff(card, "      ") : card;
    }
  )
  .join("\n")}
    </div>
  </fieldset>

  <!-- Technical Support and Bug Report only: pick a deployment first. No
       default, so nobody files an Edge issue on the Public Cloud form. -->
  <fieldset class="vq-choice-group" data-vq-reasons="${issue}">
    <legend class="vq-label">Deployment <span class="vq-required" aria-hidden="true">*</span></legend>
    <div class="vq-choices">
${MAP.deployments
  .map(
    (d) => `      <label class="vq-choice">
        <input class="vq-choice__input" type="radio" name="deployment" value="${d.id}" required>
        ${icon(d.icon, "vq-choice__icon")}
        <span class="vq-choice__title">${esc(d.label)}</span>
${d.hint ? `        <span class="vq-choice__hint">${esc(d.hint)}</span>` : ""}
      </label>`
  )
  .join("\n")}
    </div>
    <p class="vq-help">${esc(MAP.deploymentHelp)}</p>
  </fieldset>
  <p class="vq-empty-hint" data-vq-reasons="${issue}" data-vq-no-deployment>Choose a deployment to see the questions for it.</p>

${MAP.sections.map((sec) => section(sec)).join("\n\n")}

${staff(`  <!-- Security Issue: its own template, no deployment picker. -->
  <p class="vq-note" data-vq-reasons="${S.reason}">${esc(S.intro)}</p>

${S.sections.map((sec) => section(sec, S.reason, false)).join("\n\n")}`)}

  <!-- Every other reason: one free-text message instead of the issue fields. -->
  <div class="vq-field" data-vq-not-reasons="${issue} ${S.reason}">
    <label class="vq-label" for="support-message">Message <span class="vq-required" aria-hidden="true">*</span></label>
    <textarea class="vq-textarea" id="support-message" name="message" rows="5" placeholder="Type a message" required></textarea>
  </div>

  <!-- Attachments: every reason. The "attached" ticks only show for issue reports. -->
  <fieldset class="vq-form-section">
    <legend class="vq-legend">${esc(A.label)}</legend>
    <div class="vq-stack">
${MAP.deployments
  .map(
    (d) => `    <!-- The templates' "…attached" ticks for ${d.label}. -->
    <fieldset class="vq-checklist" data-vq-reasons="${issue}" data-vq-deployments="${d.id}">
      <legend class="vq-checklist__title">${esc(A.checklistTitle)}</legend>
${A.checklist[d.id]
  .map(
    (i) => `      <label class="vq-check"><input class="vq-check__input" type="checkbox" name="${i.name}" value="yes"> ${esc(i.label)}</label>${
      i.help ? `\n      <p class="vq-help">${esc(i.help)}</p>` : ""
    }`
  )
  .join("\n")}${A.checklistNote?.[d.id] ? `\n      <p class="vq-help">${esc(A.checklistNote[d.id])}</p>` : ""}
    </fieldset>`
  )
  .join("\n")}
    <label class="vq-dropzone" data-vq-dropzone>
      ${icon("file-up", "vq-dropzone__icon")}
      <span class="vq-dropzone__title">Drop files here or <span class="vq-dropzone__browse">browse</span></span>
      <span class="vq-dropzone__limits">Up to ${A.maxFiles} files, ${A.maxMb} MB each. ${esc(A.acceptLabel)}.</span>
      <input class="vq-dropzone__input" type="file" name="${A.name}" multiple accept="${A.accept}" data-vq-files data-vq-max-files="${A.maxFiles}" data-vq-max-mb="${A.maxMb}">
    </label>
    <div class="vq-notice vq-notice--error" role="alert" data-vq-files-error hidden>
      ${icon("circle-alert", "vq-notice__icon")}
      <span data-vq-files-error-text></span>
    </div>
    <ul class="vq-filelist" data-vq-filelist></ul>
    <p class="vq-help vq-help--icon">${icon("shield-alert", "vq-help__icon")} <span data-vq-not-reasons="${S.reason}">${esc(
      A.secretsWarning
    )}</span><span data-vq-reasons="${S.reason}">${esc(S.secretsWarning)}</span></p>
    </div>
  </fieldset>

  <div>
    <button type="submit" class="vq-btn vq-btn--default">Send Message</button>
  </div>
</form>
${END}`;

const page = readFileSync(TARGET, "utf8");
const a = page.indexOf(START);
const b = page.indexOf(END);
if (a === -1 || b === -1) throw new Error(`${TARGET}: missing @generated markers`);
writeFileSync(TARGET, page.slice(0, a) + form + page.slice(b + END.length));
console.log(`Wrote the support form into ${TARGET}`);
