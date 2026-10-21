"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

// Order matches the live form (community.vantiq.com/register/).
const COMMUNITY_ROLES = ["Guest", "VANTIQ Partner", "VANTIQ Customer", "VANTIQ Employee"];

// Live destinations of the two policy links. Both open in a new tab, as on
// the live form, so a half-filled form isn't lost.
const PRIVACY_POLICY_URL = "https://vantiq.com/privacy-policy/";
const TERMS_OF_SERVICE_URL = "https://community.vantiq.com/terms-of-service/";

// Same check the live form uses before it enables "Resend Email".
const EMAIL_PATTERN = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;

// The confidentiality acknowledgment only applies to current VANTIQ
// customers and partners (see the checkbox copy below) — Guests and
// Employees have no existing agreement for it to reference.
const ROLES_REQUIRING_CONFIDENTIALITY_ACK = ["VANTIQ Customer", "VANTIQ Partner"];

const POSITION_DESCRIPTIONS = ["Architect", "Developer", "Marketing", "Pre-Sales", "Project Manager", "Sales"];

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
  "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
].sort((a, b) => a.localeCompare(b));

export default function RegisterPage() {
  // Every entry point to this page (landing's "Register for partner access"
  // and "New here? Create an account") is partner-intent — Guest doesn't need
  // to register at all, it's a zero-friction button on the landing page — so
  // defaulting here to Guest would make the majority of arrivals correct
  // their own stated intent on the very first field.
  const [communityRole, setCommunityRole] = React.useState("VANTIQ Partner");
  const [positionDescription, setPositionDescription] = React.useState("");
  const [country, setCountry] = React.useState("United States");
  const [agreed, setAgreed] = React.useState(false);
  const [confidentialityAgreed, setConfidentialityAgreed] = React.useState(false);
  const [pwError, setPwError] = React.useState<string | null>(null);
  const [consentError, setConsentError] = React.useState(false);
  const [confidentialityError, setConfidentialityError] = React.useState(false);
  // Registering doesn't sign anyone in: the account only becomes active once
  // the validation link in the email is clicked. Until then the form stays
  // put and says so, as on the live site.
  const [registered, setRegistered] = React.useState(false);
  const [resendOpen, setResendOpen] = React.useState(false);
  const [resendEmail, setResendEmail] = React.useState("");
  const [resendState, setResendState] = React.useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const repeatPassword = (form.elements.namedItem("repeatPassword") as HTMLInputElement).value;

    // Validate at the field, inline — not via a toast the user has to read and
    // then hunt back up the form to act on.
    if (password.length < 8) {
      setPwError("Use at least 8 characters.");
      return;
    }
    if (password !== repeatPassword) {
      setPwError("Those two passwords don't match.");
      return;
    }
    setPwError(null);

    if (!agreed) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    if (ROLES_REQUIRING_CONFIDENTIALITY_ACK.includes(communityRole) && !confidentialityAgreed) {
      setConfidentialityError(true);
      return;
    }
    setConfidentialityError(false);

    setRegistered(true);
  }

  function handleResend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(resendEmail.trim())) return;
    // No backend in the mockup: stand in for the request round-trip.
    setResendState("sending");
    window.setTimeout(() => setResendState("sent"), 700);
  }

  return (
    // Same full-bleed Azure Mist wash as the sign-in landing hero, fading to
    // the white canvas. The fade ends at a fixed height (about the hero's)
    // rather than a percentage, because this form is long: a percentage
    // stretched the tint down the whole page.
    <div
      className="relative -mt-8 flex justify-center px-4 pt-12 pb-16 md:-mt-10 md:pt-20"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        background: "linear-gradient(to bottom, var(--secondary) 0px, var(--canvas) 480px)",
      }}
    >
      <Card className="shadow-card w-full max-w-lg p-6">
        <h1 className="text-center text-xl font-semibold text-foreground">Join the Vantiq Community</h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          You will receive a validation email to confirm your registration.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <fieldset className="space-y-3">
            <legend className="mb-2 text-sm font-medium text-emphasis-vivid">
              About you <span className="text-destructive">*</span>
            </legend>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                id="register-first-name"
                name="firstName"
                placeholder="First name"
                aria-label="First name"
                autoComplete="given-name"
                required
              />
              <Input
                id="register-last-name"
                name="lastName"
                placeholder="Last name"
                aria-label="Last name"
                autoComplete="family-name"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
              <p className="text-xs text-muted-foreground">
                Use your work email with your company&apos;s domain if you&apos;re registering as a customer or partner.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-country">Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="register-country" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="mb-2 text-sm font-medium text-emphasis-vivid">Your organization</legend>

            <div className="space-y-1.5">
              <Label htmlFor="community-role">Community role</Label>
              <Select value={communityRole} onValueChange={setCommunityRole}>
                <SelectTrigger id="community-role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMMUNITY_ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-company">
                Company <span className="text-destructive">*</span>
              </Label>
              <Input
                id="register-company"
                name="company"
                placeholder="Company"
                autoComplete="organization"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-position">Job title</Label>
              <Input
                id="register-position"
                name="position"
                placeholder="e.g. Solutions Architect"
                autoComplete="organization-title"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="position-description">Role category</Label>
              <Select value={positionDescription} onValueChange={setPositionDescription}>
                <SelectTrigger id="position-description" className="w-full">
                  <SelectValue placeholder="Which best describes your work?" />
                </SelectTrigger>
                <SelectContent>
                  {POSITION_DESCRIPTIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="mb-2 text-sm font-medium text-emphasis-vivid">
              Create a password <span className="text-destructive">*</span>
            </legend>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                id="register-password"
                name="password"
                type="password"
                placeholder="Password"
                aria-label="Password"
                autoComplete="new-password"
                minLength={8}
                required
                aria-invalid={!!pwError}
                aria-describedby="pw-help pw-error"
                onChange={() => pwError && setPwError(null)}
              />
              <Input
                id="register-repeat-password"
                name="repeatPassword"
                type="password"
                placeholder="Repeat password"
                aria-label="Repeat password"
                autoComplete="new-password"
                minLength={8}
                required
                aria-invalid={!!pwError}
                aria-describedby="pw-error"
                onChange={() => pwError && setPwError(null)}
              />
            </div>
            <p id="pw-help" className="text-xs text-muted-foreground">
              At least 8 characters.
            </p>
            {pwError && (
              <p id="pw-error" role="alert" className="text-xs font-medium text-destructive">
                {pwError}
              </p>
            )}
          </fieldset>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground">
              <Checkbox
                checked={agreed}
                onCheckedChange={(v) => {
                  setAgreed(v === true);
                  if (v === true) setConsentError(false);
                }}
                aria-invalid={consentError}
                className="mt-0.5"
              />
              <span>
                By checking this box, I agree I want to receive communications from and about VANTIQ by
                email. I consent to VANTIQ processing my personal data for these purposes and as described
                in VANTIQ&apos;s{" "}
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-vivid hover:underline"
                >
                  privacy policy
                </a>
                .
              </span>
            </label>
            {consentError && (
              <p role="alert" className="text-xs font-medium text-destructive">
                Please agree to the communication terms to continue.
              </p>
            )}

            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground">
              <Checkbox
                checked={confidentialityAgreed}
                onCheckedChange={(v) => {
                  setConfidentialityAgreed(v === true);
                  if (v === true) setConfidentialityError(false);
                }}
                aria-invalid={confidentialityError}
                className="mt-0.5"
              />
              <span>
                For current VANTIQ customers and partners, I acknowledge the information contained on this
                website is confidential and subject to the confidentiality terms included in my agreement
                with VANTIQ.
              </span>
            </label>
            {confidentialityError && (
              <p role="alert" className="text-xs font-medium text-destructive">
                Please acknowledge the confidentiality terms to continue.
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={registered}>
            Register
          </Button>

          {/* Live: #register-response, the one status line under Register.
              Handover kit: .vq-notice .vq-notice--success (HANDOVER.md,
              "Registration"). */}
          {registered && (
            <div
              role="status"
              className="flex gap-2.5 rounded-lg border border-success/25 bg-success/8 p-3 text-sm text-foreground"
            >
              <CheckCircle2 className="mt-px size-4 shrink-0 text-success" />
              <p>Registration successful! Please check your email for a confirmation link.</p>
            </div>
          )}

          <a
            href={TERMS_OF_SERVICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
          >
            View our Terms of Service
          </a>
        </form>

        {/* Resend panel: a link-style toggle that opens an inline form under
            it, rather than a separate page (live: #resend-trigger opens
            #resend-panel). Its own form, separate from registration. */}
        <div className="mt-4 border-t border-border pt-4">
          <Button
            type="button"
            variant="link"
            aria-expanded={resendOpen}
            aria-controls="resend-panel"
            onClick={() => setResendOpen(true)}
            className="h-auto w-full justify-center p-0 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Waiting for your validation email?
          </Button>

          {resendOpen && (
            <form id="resend-panel" onSubmit={handleResend} noValidate className="mt-4 space-y-3">
              <p className="text-center text-sm text-foreground">
                Enter your registration address
                <br />
                and we&apos;ll resend your validation email.
              </p>
              <Input
                id="resend-email"
                type="email"
                inputMode="email"
                aria-label="Registration email address"
                placeholder="you@company.com"
                autoComplete="email"
                autoFocus
                value={resendEmail}
                onChange={(e) => {
                  setResendEmail(e.target.value);
                  if (resendState === "sent") setResendState("idle");
                }}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={!EMAIL_PATTERN.test(resendEmail.trim()) || resendState === "sending"}
              >
                {resendState === "sending" ? "Sending request…" : "Resend Email"}
              </Button>
              {resendState === "sent" && (
                <div
                  role="status"
                  className="flex gap-2.5 rounded-lg border border-success/25 bg-success/8 p-3 text-sm text-foreground"
                >
                  <CheckCircle2 className="mt-px size-4 shrink-0 text-success" />
                  <p>Please check your email for a confirmation link.</p>
                </div>
              )}
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}
