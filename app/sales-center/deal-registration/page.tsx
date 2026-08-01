"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
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
        description="Register a customer opportunity and track it through to close."
      />

      <Card className="max-w-2xl shadow-card p-0">
        <form onSubmit={handleSubmit} className="divide-y divide-border">
          <div className="space-y-4 p-6">
            <h2 className="text-sm font-semibold text-foreground">1. Partner Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="partnerName">
                  Partner Name <span className="text-destructive">*</span>
                </Label>
                <Input id="partnerName" name="partnerName" placeholder="Enter partner name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="partnerOrganization">
                  Partner Organization <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="partnerOrganization"
                  name="partnerOrganization"
                  placeholder="Enter partner organization"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="partnerEmail">
                Partner Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="partnerEmail"
                name="partnerEmail"
                type="email"
                placeholder="Enter partner email address"
                required
              />
            </div>
          </div>

          <div className="space-y-4 p-6">
            <h2 className="text-sm font-semibold text-foreground">2. Contact Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input id="firstName" name="firstName" placeholder="Enter first name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input id="lastName" name="lastName" placeholder="Enter last name" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactEmail">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="space-y-4 p-6">
            <h2 className="text-sm font-semibold text-foreground">3. Customer Opportunity</h2>
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
            <div className="space-y-1.5">
              <Label htmlFor="projectDescription">
                Project Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                rows={4}
                placeholder="Briefly describe the customer opportunity, business challenge, scope, timeline, and estimated value."
                required
              />
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
