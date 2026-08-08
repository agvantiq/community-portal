"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRole } from "@/components/shell/role-provider";
import { toast } from "sonner";

const COUNTRIES = [
  "Australia",
  "Brazil",
  "Canada",
  "France",
  "Germany",
  "India",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Singapore",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
];

function requiredValue(form: HTMLFormElement, name: string) {
  return (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "";
}

export default function DealRegistrationPage() {
  const { info, role } = useRole();
  const [country, setCountry] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const customer = requiredValue(form, "customerName") || "New Customer";

    form.reset();
    setCountry("");
    toast.success(`${customer} registered. Our team will follow up shortly.`);
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/sales-center" className="hover:text-foreground">
            &larr; Sales Hub
          </Link>
        }
        title="Deal Registration"
        description="Register a customer opportunity."
      >
        {role !== "onboarding" && (
          <BookmarkButton
            item={{
              id: "/sales-center/deal-registration",
              label: "Deal Registration",
              href: "/sales-center/deal-registration",
              iconKey: "Handshake",
            }}
            className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        )}
      </PageHero>

      <Card className="max-w-2xl shadow-card p-0">
        <form onSubmit={handleSubmit} className="divide-y divide-border">
          <div className="space-y-4 p-6">
            <h2 className="text-sm font-semibold text-foreground">1. Your Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="partnerName">Your Name</Label>
                <Input id="partnerName" name="partnerName" value={info.user.name} disabled />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="partnerOrganization">Partner Organization Name</Label>
                <Input
                  id="partnerOrganization"
                  name="partnerOrganization"
                  value={info.user.org ?? ""}
                  disabled
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="partnerEmail">Your Work Email</Label>
              <Input id="partnerEmail" name="partnerEmail" value={info.user.email} disabled />
            </div>
          </div>

          <div className="space-y-4 p-6">
            <h2 className="text-sm font-semibold text-foreground">2. Customer Contact</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="customerName">
                  Customer Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  placeholder="Enter customer company name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="country">
                  Country <span className="text-destructive">*</span>
                </Label>
                <Select value={country} onValueChange={setCountry} required name="country">
                  <SelectTrigger id="country" className="w-full">
                    <SelectValue placeholder="Select a country" />
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
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="contactName">
                  Contact Name <span className="text-destructive">*</span>
                </Label>
                <Input id="contactName" name="contactName" placeholder="Enter contact name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contactEmail">
                  Contact Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder="Enter contact email address"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="contactTitle">
                  Contact Role / Job Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contactTitle"
                  name="contactTitle"
                  placeholder="Enter contact role or job title"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contactBusinessUnit">
                  Contact Business Unit <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contactBusinessUnit"
                  name="contactBusinessUnit"
                  placeholder="Enter contact business unit"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <h2 className="text-sm font-semibold text-foreground">3. Opportunity Details</h2>
            <div className="space-y-1.5">
              <Label htmlFor="projectName">
                Project Name <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Input id="projectName" name="projectName" placeholder="Enter project name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="projectDescription">
                Project Description <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                rows={4}
                placeholder="Briefly describe the customer opportunity, business challenge, scope, and timeline."
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="expectedCloseDate">
                  Expected Date to Close <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input id="expectedCloseDate" name="expectedCloseDate" type="date" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dollarAmount">
                  Dollar Amount <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="dollarAmount"
                  name="dollarAmount"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter estimated deal value"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-6">
            <Button type="submit" className="w-full sm:w-fit">
              Submit Deal Registration
            </Button>
            <p className="text-xs text-muted-foreground">
              By submitting this form, you agree that Vantiq may contact you regarding your inquiry.
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
