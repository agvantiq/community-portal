"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  MailCheck,
  WandSparkles,
} from "lucide-react";

// "Lost your password?" flow. Four states plus an error variant, each
// reachable directly with ?step= so reviewers can link to any of them (the
// mockup sends no email, so ?step=new is how to see the set-a-new-password
// screen after "Check your email"):
//
//   request  — enter your email            (WP: wp-login.php?action=lostpassword)
//   expired  — request, with an error      (WP: …?action=lostpassword&error=expiredkey / invalidkey)
//   sent     — check your email            (WP: …?checkemail=confirm — see HANDOVER.md, the
//                                            live site currently bounces this back to sign-in)
//   new      — set a new password          (WP: …?action=rp&key=…&login=…)
//   done     — password updated            (WP: …?action=resetpass)
//
// Built on WordPress's own screens on purpose (HANDOVER.md rule 10): the
// order is always logo → message → form → "Back to sign in · Create an
// account", which is exactly #login → .message → form → #nav on wp-login.php,
// so public/handover/vantiq-login.css can restyle the real pages instead of
// the contractor rebuilding them. The "sent" message never says whether the
// email has an account (that would let anyone check who's registered).

type Step = "request" | "expired" | "sent" | "new" | "done";
const STEPS: Step[] = ["request", "expired", "sent", "new", "done"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_COOLDOWN_S = 30;

// --- Password strength -------------------------------------------------------
// Four levels, same names and order as WordPress's meter (#pass-strength-result:
// short / bad / good / strong), so the mockup and the real page agree.
type Strength = { level: 0 | 1 | 2 | 3; label: string };

function strengthOf(pw: string): Strength {
  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(pw)).length;
  if (pw.length < 8) return { level: 0, label: "Very weak" };
  if (pw.length < 12 || kinds <= 2) return { level: 1, label: "Weak" };
  if ((pw.length >= 14 && kinds === 4) || (pw.length >= 16 && kinds >= 3)) return { level: 3, label: "Strong" };
  return { level: 2, label: "Medium" };
}

const STRENGTH_TONE = ["bg-destructive", "bg-destructive", "bg-warning", "bg-success"] as const;
const STRENGTH_TEXT = ["text-destructive", "text-destructive", "text-foreground", "text-success"] as const;

function generatePassword() {
  const sets = ["abcdefghijkmnpqrstuvwxyz", "ABCDEFGHJKLMNPQRSTUVWXYZ", "23456789", "!@#$%^&*?-_"];
  const all = sets.join("");
  const pick = (s: string) => s[crypto.getRandomValues(new Uint32Array(1))[0] % s.length];
  const chars = [...sets.map(pick), ...Array.from({ length: 16 }, () => pick(all))];
  // Shuffle so the guaranteed character of each kind isn't always up front.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

// --- Pieces ------------------------------------------------------------------

/** The round icon that opens every state — the one visual anchor of the card. */
function StateIcon({ icon: Icon, tone = "primary" }: { icon: React.ComponentType<{ className?: string }>; tone?: "primary" | "success" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-11 items-center justify-center rounded-full",
        tone === "success" ? "bg-success/12 text-success" : "bg-primary-vivid/12 text-primary-vivid"
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}

function CardHeader({ icon, tone, title, children }: { icon: React.ComponentType<{ className?: string }>; tone?: "primary" | "success"; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <StateIcon icon={icon} tone={tone} />
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground text-balance">{title}</h1>
        {children && <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
}

// --- Page --------------------------------------------------------------------

export default function ResetPasswordPage() {
  const [step, setStepState] = React.useState<Step>("request");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [sending, setSending] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(0);

  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmWeak, setConfirmWeak] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const headingRef = React.useRef<HTMLDivElement>(null);

  // Deep-linkable states: read ?step= once, then mirror the current state
  // back into the URL so the address bar always names what's on screen.
  React.useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("step") as Step | null;
    if (fromUrl && STEPS.includes(fromUrl)) setStepState(fromUrl);
  }, []);

  function setStep(next: Step) {
    setStepState(next);
    const url = new URL(window.location.href);
    url.searchParams.set("step", next);
    window.history.replaceState(null, "", url);
    // Move focus to the new state's heading so keyboard and screen-reader
    // users land on the change rather than on a control that just vanished.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function handleRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setEmailError("Enter the email address you use for the Vantiq Community.");
      emailInputRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setEmailError("That doesn't look like an email address — check it reads like you@company.com.");
      emailInputRef.current?.focus();
      return;
    }
    setEmailError(null);
    setSending(true);
    // Mockup only: stands in for the request round-trip.
    setTimeout(() => {
      setSending(false);
      setCooldown(RESEND_COOLDOWN_S);
      setStep("sent");
    }, 700);
  }

  function handleResend() {
    setCooldown(RESEND_COOLDOWN_S);
    toast.success("Reset link sent again", { description: "It can take a minute or two to arrive." });
  }

  const strength = strengthOf(password);
  const isWeak = password.length > 0 && strength.level < 2;
  const canSave = password.length > 0 && (!isWeak || confirmWeak);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setStep("done");
    }, 700);
  }

  return (
    // Same full-bleed Azure Mist wash as the sign-in landing, so this reads as
    // the next screen of sign-in rather than a different place.
    <div
      className="-mt-8 flex min-h-[calc(100vh-4rem)] justify-center px-4 pt-12 pb-16 md:-mt-10 md:pt-20"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        background: "linear-gradient(to bottom, var(--secondary) 0%, var(--canvas) 55%)",
      }}
    >
      <div className="flex w-full max-w-[420px] flex-col">
        <Card className="shadow-card gap-6 p-7 sm:p-8">
          <div
            ref={headingRef}
            tabIndex={-1}
            // Programmatic focus target only — the global :focus-visible ring
            // would box the whole heading, so it's suppressed here.
            style={{ outline: "none" }}
            aria-live="polite"
          >
            {(step === "request" || step === "expired") && (
              <CardHeader icon={KeyRound} title="Reset your password">
                Enter the email you use for the Vantiq Community and we&apos;ll send you a link to set a new
                password.
              </CardHeader>
            )}
            {step === "sent" && (
              <CardHeader icon={MailCheck} title="Check your email">
                {/* Deliberately doesn't repeat the address: on WordPress this is
                    a separate page that can't know it without putting the
                    email in the URL (see HANDOVER.md, "Password reset"). */}
                If an account exists for that email address, you&apos;ll get an email with a link to reset your
                password. The link works for 24 hours.
              </CardHeader>
            )}
            {step === "new" && (
              <CardHeader icon={LockKeyhole} title="Set a new password">
                Choose a password you don&apos;t use anywhere else.
              </CardHeader>
            )}
            {step === "done" && (
              <CardHeader icon={CheckCircle2} tone="success" title="Password updated">
                Your password has been reset. Sign in with your new password to pick up where you left off.
              </CardHeader>
            )}
          </div>

          {/* ---- request / expired ---- */}
          {(step === "request" || step === "expired") && (
            <form onSubmit={handleRequest} noValidate className="flex flex-col gap-4">
              {step === "expired" && (
                <div
                  role="alert"
                  className="flex gap-2.5 rounded-lg border border-destructive/25 bg-destructive/6 p-3 text-sm text-foreground"
                >
                  <AlertCircle className="mt-px size-4 shrink-0 text-destructive" />
                  <p>That reset link has expired or was already used. Enter your email to get a new one.</p>
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reset-email">Email address</Label>
                <Input
                  ref={emailInputRef}
                  id="reset-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  aria-invalid={emailError ? true : undefined}
                  aria-describedby={emailError ? "reset-email-error" : undefined}
                  className="h-10"
                />
                {emailError && (
                  <p id="reset-email-error" className="text-xs text-destructive">
                    {emailError}
                  </p>
                )}
              </div>
              <Button type="submit" className="h-10 w-full" disabled={sending}>
                {sending ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          )}

          {/* ---- sent ---- */}
          {step === "sent" && (
            <div className="flex flex-col gap-5">
              <div className="rounded-lg bg-muted px-4 py-3 text-sm">
                <p className="font-medium text-foreground">Didn&apos;t get it?</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>Check your spam or junk folder.</li>
                  <li>Make sure it&apos;s the work email you registered with.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2.5">
                <Button asChild className="h-10 w-full">
                  <Link href="/">Back to sign in</Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full tabular-nums"
                  disabled={cooldown > 0}
                  onClick={handleResend}
                >
                  {cooldown > 0 ? `Resend link in ${cooldown}s` : "Resend link"}
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={() => setStep("request")}
                >
                  Use a different email
                </Button>
              </div>
            </div>
          )}

          {/* ---- new password ---- */}
          {step === "new" && (
            <form onSubmit={handleSave} noValidate className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <Label htmlFor="reset-new-password">New password</Label>
                  <button
                    type="button"
                    onClick={() => {
                      setPassword(generatePassword());
                      setShowPassword(true);
                      setConfirmWeak(false);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-vivid hover:underline"
                  >
                    <WandSparkles className="size-3.5" />
                    Generate a strong one
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="reset-new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    spellCheck={false}
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setConfirmWeak(false);
                    }}
                    aria-describedby="reset-strength reset-hint"
                    className="h-10 pr-11 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute top-1/2 right-1 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>

                {/* Strength: four segments + a word. The word carries the
                    meaning; color only reinforces it. */}
                <div id="reset-strength" aria-live="polite" className="mt-1 flex items-center gap-3">
                  <div aria-hidden className="grid flex-1 grid-cols-4 gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1.5 rounded-full transition-colors duration-200",
                          password && i <= strength.level ? STRENGTH_TONE[strength.level] : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span
                    className={cn(
                      "w-16 text-right text-xs font-medium",
                      password ? STRENGTH_TEXT[strength.level] : "text-muted-foreground"
                    )}
                  >
                    {password ? strength.label : "—"}
                  </span>
                </div>
                <p id="reset-hint" className="text-xs leading-relaxed text-muted-foreground">
                  Use at least 12 characters. Mixing upper and lower case letters, numbers and symbols makes it
                  stronger.
                </p>
              </div>

              {isWeak && (
                <label className="flex cursor-pointer items-start gap-2.5 rounded-lg bg-muted px-3 py-2.5 text-sm text-foreground">
                  <Checkbox
                    checked={confirmWeak}
                    onCheckedChange={(v) => setConfirmWeak(v === true)}
                    // The default input-colored border disappears on the
                    // muted panel; this keeps the box itself visible.
                    className="mt-0.5 border-muted-foreground/60 bg-card"
                  />
                  <span>
                    Use this weak password anyway
                    <span className="block text-xs text-muted-foreground">
                      It&apos;ll be easier for someone else to guess.
                    </span>
                  </span>
                </label>
              )}

              <Button type="submit" className="h-10 w-full" disabled={!canSave || saving}>
                {saving ? "Saving…" : "Save password"}
              </Button>
            </form>
          )}

          {/* ---- done ---- */}
          {step === "done" && (
            <Button asChild className="h-10 w-full">
              <Link href="/">Sign in</Link>
            </Button>
          )}
        </Card>

        {/* Mirrors wp-login.php's #nav: the way back, and the way in for
            people who never had an account. */}
        {(step === "request" || step === "expired" || step === "new") && (
          <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-1 font-medium text-primary-vivid hover:underline">
              <ArrowLeft className="size-3.5" />
              Back to sign in
            </Link>
            <span aria-hidden>·</span>
            <Link href="/register" className="font-medium text-primary-vivid hover:underline">
              Create an account
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}
