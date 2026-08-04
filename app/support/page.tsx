"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { BookmarkButton } from "@/components/bookmark-button";

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

const DEPLOYMENT_TYPES = [
  { value: "public-cloud", label: "Public Cloud" },
  { value: "edge", label: "Edge" },
  { value: "private-cloud", label: "Private Cloud" },
];

export default function SupportPage() {
  const [reason, setReason] = React.useState("technical");
  const [deploymentType, setDeploymentType] = React.useState(DEPLOYMENT_TYPES[0].value);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setReason("technical");
    setDeploymentType(DEPLOYMENT_TYPES[0].value);
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
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Business Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reason">Reason for Inquiry</Label>
              <Select value={reason} onValueChange={setReason} name="reason">
                <SelectTrigger id="reason" className="w-full">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="onboarding">Partner Onboarding</SelectItem>
                  <SelectItem value="sales">Sales Question</SelectItem>
                  <SelectItem value="bug-report">Bug Report</SelectItem>
                  <SelectItem value="account-permissions">Account & Permissions</SelectItem>
                  <SelectItem value="event-support">Event Support</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {reason === "technical" && (
              <div className="space-y-1.5">
                <Label htmlFor="deploymentType">Deployment Type</Label>
                <Select value={deploymentType} onValueChange={setDeploymentType} name="deploymentType">
                  <SelectTrigger id="deploymentType" className="w-full">
                    <SelectValue placeholder="Select a deployment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPLOYMENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} required />
            </div>
            <Button type="submit" className="w-full sm:w-fit">
              Send Message
            </Button>
          </form>
        </Card>

        <div className="flex flex-col gap-6 lg:col-span-2">
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

          <Card className="shadow-card p-6">
            <h2 className="mb-1 text-sm font-medium text-foreground">Direct Escalation</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Need urgent assistance with an active enterprise deal? Contact your dedicated
              Partner Success Manager directly.
            </p>
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
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
        </div>
      </div>
    </div>
  );
}
