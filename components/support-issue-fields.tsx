"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, FileUp, Paperclip, ShieldAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SUPPORT_FORM from "@/lib/support-form.json";

// Renders the Contact Support issue forms from lib/support-form.json, the same
// field map the WordPress handover form is generated from
// (scripts/gen-support-form.mjs), so the two can't drift apart.
//
// Switching deployment never clears anything. Every section and field is
// always in the DOM; ones that don't apply to the chosen deployment are
// hidden inside a disabled <fieldset>, so they're skipped by validation and
// left out of the submission, and come back with their values if the user
// switches back. vantiq-support.js does the same on WordPress.
//
// Layout: inside a section, each labelled field is a three-row subgrid
// (label / control / help), so in a two-column row the controls line up even
// when one label wraps to two lines.

export type DeploymentId = "public" | "private" | "edge";

type Field = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "url"
    | "date"
    | "textarea"
    | "select"
    | "checkbox"
    | "check-detail"
    | "radio"
    | "checkgroup";
  required?: boolean;
  placeholder?: string;
  /** A string, or per-deployment text keyed by space-separated deployment ids. */
  help?: string | Record<string, string>;
  options?: string[];
  only?: string[];
  half?: boolean;
  /** Radio options one per line (long option text). */
  stacked?: boolean;
  /** The section title already says it; keep the label for screen readers only. */
  hideLabel?: boolean;
};

type Section = {
  id: string;
  title: string;
  description?: string;
  only?: string[];
  fields: Field[];
};

const SECTIONS = SUPPORT_FORM.sections as Section[];
const SECURITY_SECTIONS = SUPPORT_FORM.security.sections as Section[];
export const SECURITY = SUPPORT_FORM.security;
export const DEPLOYMENTS = SUPPORT_FORM.deployments as {
  id: DeploymentId;
  label: string;
  hint: string;
  icon: string;
  guideline: string;
}[];
export const ISSUE_REASONS = SUPPORT_FORM.issueReasons;
const ATTACHMENTS = SUPPORT_FORM.attachments;

const appliesTo = (only: string[] | undefined, deployment: DeploymentId | null) =>
  !only || (deployment !== null && only.includes(deployment));

function helpFor(help: Field["help"], deployment: DeploymentId | null) {
  if (!help || typeof help === "string") return help;
  const key = Object.keys(help).find((k) => deployment !== null && k.split(" ").includes(deployment));
  return key ? help[key] : undefined;
}

const NATIVE_SELECT =
  "border-input dark:bg-input/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm";
const CHECK = "mt-0.5 size-4 shrink-0 accent-[var(--primary-vivid)]";
const LABEL = "text-sm font-medium leading-snug text-foreground";

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      {" "}*
    </span>
  );
}

/**
 * A selectable card backed by a real radio input. Shared by the reason and
 * deployment pickers so both read as one control family: icon, title, and
 * an optional one-line hint.
 */
export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  icon: Icon,
  title,
  hint,
  required,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex min-h-[76px] cursor-pointer flex-col gap-1.5 rounded-lg border p-3 transition-colors hover:border-primary-vivid/40 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
        checked ? "border-primary-vivid bg-primary-vivid/12 ring-1 ring-primary-vivid" : "border-border"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        className="sr-only"
      />
      <Icon className="size-4 text-primary-vivid" />
      <span className="text-xs font-medium leading-snug text-foreground">{title}</span>
      {hint && <span className="-mt-1 text-xs leading-snug text-muted-foreground">{hint}</span>}
    </label>
  );
}

/** A titled group of fields, divided from the one above by a rule. */
function FormSection({
  section,
  visible,
  children,
}: {
  section: Section;
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset hidden={!visible} disabled={!visible} className="min-w-0 border-t border-border pt-5">
      <legend className="float-left w-full text-sm font-semibold text-emphasis-vivid">{section.title}</legend>
      {section.description && (
        <p className="clear-left pt-1 text-xs leading-relaxed text-muted-foreground">{section.description}</p>
      )}
      <div className="clear-left grid grid-cols-1 gap-x-3 gap-y-4 pt-3.5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function FieldControl({ field, deployment }: { field: Field; deployment: DeploymentId | null }) {
  const id = `support-${field.name}`;
  const help = helpFor(field.help, deployment);
  const helpId = help ? `${id}-help` : undefined;
  const labelId = `${id}-label`;
  const [checked, setChecked] = React.useState(false);
  const span = field.half ? "" : "sm:col-span-2";
  // Label / control / help share the parent's row tracks (see top comment).
  const cell = cn("grid min-w-0 grid-rows-subgrid row-span-3 gap-y-1.5", span);

  if (field.type === "checkbox") {
    return (
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground">
          <input type="checkbox" name={field.name} value="yes" aria-describedby={helpId} className={CHECK} />
          <span>{field.label}</span>
        </label>
        {help && (
          <p id={helpId} className="mt-1 pl-[26px] text-xs text-muted-foreground">
            {help}
          </p>
        )}
      </div>
    );
  }

  if (field.type === "check-detail") {
    // Two controls sharing a row: the checkbox says "this interface is
    // affected", and the text field beside it only appears once checked.
    return (
      <div className="flex min-h-9 flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-center">
        <label className="flex w-28 shrink-0 cursor-pointer items-center gap-2.5 text-sm text-foreground">
          <input
            type="checkbox"
            name={`${field.name}_selected`}
            value="yes"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            aria-controls={id}
            aria-expanded={checked}
            className="size-4 shrink-0 accent-[var(--primary-vivid)]"
          />
          {field.label}
        </label>
        <Input
          id={id}
          name={field.name}
          placeholder={field.placeholder}
          aria-label={`${field.label} details`}
          hidden={!checked}
          disabled={!checked}
          className="flex-1"
        />
      </div>
    );
  }

  if (field.type === "radio" || field.type === "checkgroup") {
    const isRadio = field.type === "radio";
    return (
      <div className={cell} role={isRadio ? "radiogroup" : "group"} aria-labelledby={labelId}>
        <p id={labelId} className={cn(LABEL, "self-end", field.hideLabel && "sr-only")}>
          {field.label}
          {field.required && <RequiredMark />}
        </p>
        <div
          className={cn(
            isRadio && !field.stacked && "flex flex-wrap gap-x-5 gap-y-2 pt-1",
            isRadio && field.stacked && "flex flex-col gap-2",
            !isRadio && "grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2",
            field.hideLabel && "row-start-1 row-span-2"
          )}
        >
          {field.options?.map((o) => (
            <label key={o} className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-foreground">
              <input
                type={isRadio ? "radio" : "checkbox"}
                name={isRadio ? field.name : `${field.name}[]`}
                value={o}
                required={isRadio && field.required}
                className={CHECK}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
        {help && (
          <p id={helpId} className="text-xs text-muted-foreground">
            {help}
          </p>
        )}
      </div>
    );
  }

  const common = {
    id,
    name: field.name,
    required: field.required,
    placeholder: field.placeholder,
    "aria-describedby": helpId,
  };

  return (
    <div className={cell}>
      <label htmlFor={id} className={cn(LABEL, "self-end")}>
        {field.label}
        {field.required && <RequiredMark />}
      </label>
      {field.type === "textarea" ? (
        <Textarea {...common} rows={3} />
      ) : field.type === "select" ? (
        <select {...common} defaultValue="" className={NATIVE_SELECT}>
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <Input {...common} type={field.type} />
      )}
      {help ? (
        <p id={helpId} className="text-xs text-muted-foreground">
          {help}
        </p>
      ) : (
        <span aria-hidden />
      )}
    </div>
  );
}

/** The deployment-dependent part of the form: every section after the picker. */
export function SupportIssueSections({ deployment }: { deployment: DeploymentId | null }) {
  return (
    <>
      {SECTIONS.map((section) => (
        <FormSection
          key={section.id}
          section={section}
          visible={deployment !== null && appliesTo(section.only, deployment)}
        >
          {section.fields.map((field) => {
            const fieldVisible = appliesTo(field.only, deployment);
            return field.only ? (
              // Per-field switch inside a shared section (e.g. Problem area,
              // only for Private Cloud). display:contents keeps the field a
              // direct grid item.
              <fieldset key={field.name} hidden={!fieldVisible} disabled={!fieldVisible} className="contents">
                <FieldControl field={field} deployment={deployment} />
              </fieldset>
            ) : (
              <FieldControl key={field.name} field={field} deployment={deployment} />
            );
          })}
        </FormSection>
      ))}
    </>
  );
}

/** The Security Issue form (Vantiq staff only — the page decides who sees it). */
export function SupportSecuritySections() {
  return (
    <>
      {SECURITY_SECTIONS.map((section) => (
        <FormSection key={section.id} section={section} visible>
          {section.fields.map((field) => (
            <FieldControl key={field.name} field={field} deployment={null} />
          ))}
        </FormSection>
      ))}
    </>
  );
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * File picker with drag-and-drop. Keeps its own list so files can be added
 * in several goes and removed one by one, and writes that list back into the
 * real <input type="file"> so a plain form submit carries them.
 */
export function SupportAttachments({
  deployment,
  showChecklist,
  secretsWarning = ATTACHMENTS.secretsWarning,
}: {
  deployment: DeploymentId | null;
  showChecklist: boolean;
  secretsWarning?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const accepted = ATTACHMENTS.accept.split(",");

  function sync(next: File[]) {
    setFiles(next);
    if (inputRef.current) {
      const dt = new DataTransfer();
      next.forEach((f) => dt.items.add(f));
      inputRef.current.files = dt.files;
    }
  }

  function add(incoming: File[]) {
    const problems: string[] = [];
    const next = [...files];
    for (const file of incoming) {
      const ext = "." + (file.name.split(".").pop() ?? "").toLowerCase();
      if (!accepted.includes(ext)) problems.push(`${file.name}: this file type isn't accepted.`);
      else if (file.size > ATTACHMENTS.maxMb * 1024 * 1024) problems.push(`${file.name}: larger than ${ATTACHMENTS.maxMb} MB.`);
      else if (next.length >= ATTACHMENTS.maxFiles) problems.push(`${file.name}: you can attach up to ${ATTACHMENTS.maxFiles} files.`);
      else if (!next.some((f) => f.name === file.name && f.size === file.size)) next.push(file);
    }
    sync(next);
    setError(problems.length ? problems.join(" ") : null);
  }

  return (
    <div className="space-y-3 border-t border-border pt-5">
      <p className="text-sm font-semibold text-emphasis-vivid">{ATTACHMENTS.label}</p>
      {/* The templates' "…attached" ticks, per deployment. Every list stays
          in the DOM (hidden + disabled when not current) so ticks survive a
          deployment switch, same as the fields above. */}
      {showChecklist &&
        DEPLOYMENTS.map((d) => {
          const current = d.id === deployment;
          const note = (ATTACHMENTS.checklistNote as Record<string, string>)[d.id];
          return (
            <fieldset
              key={d.id}
              hidden={!current}
              disabled={!current}
              className="space-y-2 rounded-lg bg-muted px-4 py-3"
            >
              <legend className="float-left mb-1 w-full text-sm font-medium text-foreground">
                {ATTACHMENTS.checklistTitle}
              </legend>
              {(ATTACHMENTS.checklist[d.id] as { name: string; label: string; help?: string }[]).map((item) => (
                <div key={item.name} className="clear-left">
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground">
                    <input type="checkbox" name={item.name} value="yes" className={CHECK} />
                    <span>{item.label}</span>
                  </label>
                  {item.help && <p className="mt-1 pl-[26px] text-xs text-muted-foreground">{item.help}</p>}
                </div>
              ))}
              {note && <p className="clear-left text-xs text-muted-foreground">{note}</p>}
            </fieldset>
          );
        })}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(Array.from(e.dataTransfer.files));
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-dashed px-4 py-6 text-center transition-colors focus-within:ring-[3px] focus-within:ring-ring/50",
          dragging ? "border-primary-vivid bg-primary-vivid/12" : "border-border hover:border-primary-vivid/50"
        )}
      >
        <FileUp className="size-5 text-primary-vivid" />
        <span className="text-sm font-medium text-foreground">
          Drop files here or <span className="text-primary-vivid underline underline-offset-2">browse</span>
        </span>
        <span className="text-xs text-muted-foreground">
          Up to {ATTACHMENTS.maxFiles} files, {ATTACHMENTS.maxMb} MB each. {ATTACHMENTS.acceptLabel}.
        </span>
        <input
          ref={inputRef}
          type="file"
          name={ATTACHMENTS.name}
          multiple
          accept={ATTACHMENTS.accept}
          className="sr-only"
          onChange={(e) => {
            const picked = Array.from(e.target.files ?? []);
            // The input now holds only the new pick; add it to the kept list.
            add(picked);
          }}
        />
      </label>
      {error && (
        <div role="alert" className="flex gap-2.5 rounded-lg border border-destructive/25 bg-destructive/6 p-3 text-sm text-foreground">
          <AlertCircle className="mt-px size-4 shrink-0 text-destructive" />
          <p>{error}</p>
        </div>
      )}
      {files.length > 0 && (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {files.map((file) => (
            <li key={file.name + file.size} className="flex items-center gap-3 px-3 py-2 text-sm">
              <Paperclip className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate text-foreground">{file.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{formatSize(file.size)}</span>
              <button
                type="button"
                onClick={() => sync(files.filter((f) => f !== file))}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
        <ShieldAlert className="mt-px size-3.5 shrink-0" />
        {secretsWarning}
      </p>
    </div>
  );
}
