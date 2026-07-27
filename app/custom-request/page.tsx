"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, FileText, Newspaper, Video, Code2, Clock } from "lucide-react";
import { toast } from "sonner";
import { BookmarkButton } from "@/components/bookmark-button";

const CONTENT_TYPES = [
  { icon: GraduationCap, label: "Training Content", detail: "A course, module, or hands-on exercise." },
  { icon: FileText, label: "Documentation", detail: "A guide, reference page, or how-to." },
  { icon: Newspaper, label: "Articles", detail: "A written deep-dive or best-practices piece." },
  { icon: Video, label: "Short Videos", detail: "A walkthrough, demo, or explainer clip." },
  { icon: Code2, label: "Code Recipes", detail: "A sample snippet or reusable template." },
];

export default function CustomRequestPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Your request has been submitted. Our content team will review it shortly.");
  }

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Request Content"
        title="Custom Request"
        description="Can't find the training, documentation, or examples you need? Tell us what's missing and we'll add it to the portal."
      >
        <BookmarkButton
          item={{ id: "/custom-request", label: "Custom Request", href: "/custom-request", iconKey: "Mail" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="shadow-card p-6 lg:col-span-3">
          <h2 className="mb-4 text-sm font-medium text-foreground">Tell us what you need</h2>
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
              <Label htmlFor="contentType">Content Type</Label>
              <Select defaultValue="training" name="contentType">
                <SelectTrigger id="contentType" className="w-full">
                  <SelectValue placeholder="Select a content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="training">Training Content</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video Tutorial</SelectItem>
                  <SelectItem value="recipe">Code Recipe</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">What are you looking for?</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Describe the content you need and how it would help you."
                required
              />
            </div>
            <Button type="submit" className="w-full sm:w-fit">
              Submit Request
            </Button>
          </form>
        </Card>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="shadow-card p-6">
            <h2 className="mb-4 text-sm font-medium text-foreground">What You Can Request</h2>
            <div className="space-y-4">
              {CONTENT_TYPES.map((type) => (
                <div key={type.label} className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <type.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{type.label}</p>
                    <p className="text-xs text-muted-foreground">{type.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="shadow-card p-6">
            <h2 className="mb-1 flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="size-4 text-primary" />
              What Happens Next
            </h2>
            <p className="mt-3 text-xs text-muted-foreground">
              Our content team reviews every request within 3 business days. High-demand topics
              are prioritized into our content roadmap, and you&apos;ll be notified by email
              when your requested content goes live.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
