"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Phone,
  Mail,
  Wrench,
  Compass,
  TrendingUp,
  Bug,
  Shield,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { BookmarkButton } from "@/components/bookmark-button";
import { cn } from "@/lib/utils";

const OFFICES = [
  {
    name: "Global Headquarters (Walnut Creek)",
    addressLine1: "1990 N California Blvd, Suite 1000",
    addressLine2: "Walnut Creek, CA 94596",
    phone: "+1 (844) 4-VANTIQ",
  },
  {
    name: "EMEA Operations (London)",
    addressLine1: "1st Floor, 32-33 Gosfield Street",
    addressLine2: "Fitzrovia, London W1W 6HL",
    phone: "+44 20 3808 6100",
  },
];

const REASONS = [
  { value: "technical", label: "Technical Support", icon: Wrench },
  { value: "onboarding", label: "Partner Onboarding", icon: Compass },
  { value: "sales", label: "Sales Question", icon: TrendingUp },
  { value: "bug-report", label: "Bug Report", icon: Bug },
  { value: "account-permissions", label: "Account & Permissions", icon: Shield },
  { value: "other", label: "Other", icon: MoreHorizontal },
];

export default function SupportPage() {
  const [reason, setReason] = React.useState("technical");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setReason("technical");
    toast.success("Your message has been sent to Vantiq Support.", {
      description: "Our team will respond within one business day.",
    });
  }

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Get in Touch"
        title="Contact Support"
        description="Whether you need technical help, have a partnership question, or need direct access to your account team, we're ready to help."
      >
        <BookmarkButton
          item={{ id: "/support", label: "Contact Support", href: "/support", iconKey: "LifeBuoy" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="shadow-card p-6 lg:col-span-3">
          <h2 className="mb-4 text-sm font-medium text-foreground">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input name="firstName" placeholder="First Name" required />
              <Input name="lastName" placeholder="Last Name" required />
            </div>
            <Input name="email" type="email" placeholder="Email" required />

            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">Reason for Inquiry</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {REASONS.map((r) => {
                  const Icon = r.icon;
                  const selected = reason === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setReason(r.value)}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors hover:border-primary/40",
                        selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
                      )}
                    >
                      <Icon className="size-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">{r.label}</span>
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="reason" value={reason} />
            </div>

            <Textarea name="message" placeholder="Type a message" rows={5} required />

            <Button type="submit" className="w-full sm:w-fit">
              Send Message
            </Button>
          </form>
        </Card>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="shadow-card p-6">
            <h2 className="mb-1 text-sm font-medium text-foreground">Direct Escalation</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Need urgent assistance with an active enterprise deal? Contact your dedicated
              Partner Success Manager directly.
            </p>
            <div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 p-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                  DS
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">David Sprinzen</p>
                <p className="truncate text-xs text-muted-foreground">Chief Growth Officer</p>
                <a
                  href="mailto:dsprinzen@vantiq.com"
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Mail className="size-3" />
                  dsprinzen@vantiq.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="shadow-card p-6">
            <h2 className="mb-4 text-sm font-medium text-foreground">Global Offices</h2>
            <div className="space-y-4">
              {OFFICES.map((office) => (
                <div key={office.name} className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center text-primary">
                    <MapPin className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{office.name}</p>
                    <p className="text-xs text-muted-foreground">{office.addressLine1}</p>
                    <p className="text-xs text-muted-foreground">{office.addressLine2}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-primary">
                      <Phone className="size-3.5" />
                      {office.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
