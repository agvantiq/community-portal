"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
import { useRole } from "@/components/shell/role-provider";
import { toast } from "sonner";

const COMMUNITY_ROLES = ["Guest", "VANTIQ Partner", "VANTIQ Employee"];

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
  const router = useRouter();
  const { setRole, setVisitorName } = useRole();
  const [communityRole, setCommunityRole] = React.useState("Guest");
  const [positionDescription, setPositionDescription] = React.useState("");
  const [country, setCountry] = React.useState("United States");
  const [agreed, setAgreed] = React.useState(false);
  const [pwError, setPwError] = React.useState<string | null>(null);
  const [consentError, setConsentError] = React.useState(false);

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

    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim();
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value.trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    if (fullName) setVisitorName(fullName);

    toast.success("Registration submitted", {
      description: "Check your inbox for a validation email — taking you to your onboarding checklist.",
    });
    setRole("first-time-partner");
    router.push("/");
  }

  function handleUnavailableLink(label: string) {
    toast.message(`${label} isn't available in this preview.`);
  }

  return (
    <div
      className="relative -mx-6 -mt-8 flex justify-center px-6 py-10 md:-mx-10 md:-mt-10 md:px-10 md:py-14"
      style={{ background: "linear-gradient(to bottom, var(--secondary) 0%, var(--background) 100%)" }}
    >
      <Card className="shadow-card w-full max-w-lg p-8">
        <h1 className="text-center text-xl font-semibold text-foreground">Join the Vantiq Community</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          It takes about a minute. We&apos;ll email you a link to validate your account.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Fields marked <span className="text-destructive">*</span> are required.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-7">
          <fieldset className="space-y-4">
            <legend className="mb-3 text-sm font-medium text-emphasis">About you</legend>

            <div className="space-y-1.5">
              <Label htmlFor="register-first-name">
                Name <span className="text-destructive">*</span>
              </Label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input id="register-first-name" name="firstName" aria-label="First name" placeholder="First name" required />
                <Input id="register-last-name" name="lastName" aria-label="Last name" placeholder="Last name" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input id="register-email" name="email" type="email" placeholder="you@company.com" required />
              <p className="text-xs text-muted-foreground">
                Use your work email with your company&apos;s domain if you&apos;re registering as a partner.
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

          <fieldset className="space-y-4">
            <legend className="mb-3 text-sm font-medium text-emphasis">Your organization</legend>

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
              <Input id="register-company" name="company" placeholder="Company" required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="register-position">Job title</Label>
              <Input id="register-position" name="position" placeholder="e.g. Solutions Architect" />
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

          <fieldset className="space-y-4">
            <legend className="mb-3 text-sm font-medium text-emphasis">Create a password</legend>

            <div className="space-y-1.5">
              <Label htmlFor="register-password">
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  aria-label="Password"
                  placeholder="Password"
                  minLength={8}
                  required
                  aria-invalid={!!pwError}
                  aria-describedby="pw-help pw-error"
                  onChange={() => pwError && setPwError(null)}
                />
                <Input
                  name="repeatPassword"
                  type="password"
                  aria-label="Repeat password"
                  placeholder="Repeat password"
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
            </div>
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
                <button
                  type="button"
                  onClick={() => handleUnavailableLink("Privacy policy")}
                  className="text-primary hover:underline"
                >
                  privacy policy
                </button>
                .
              </span>
            </label>
            {consentError && (
              <p role="alert" className="text-xs font-medium text-destructive">
                Please agree to the communication terms to continue.
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              For current VANTIQ customers and partners, I acknowledge the information contained on this
              website is confidential and subject to the confidentiality terms included in my agreement
              with VANTIQ.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>

          <Button
            type="button"
            variant="link"
            onClick={() => handleUnavailableLink("Terms of Service")}
            className="h-auto w-full justify-center p-0 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            View our Terms of Service
          </Button>
        </form>

        <Button
          type="button"
          variant="link"
          onClick={() => handleUnavailableLink("Validation email lookup")}
          className="mt-4 h-auto w-full justify-center p-0 text-sm font-medium"
        >
          Waiting for your validation email?
        </Button>
      </Card>
    </div>
  );
}
