"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilePlus2 } from "lucide-react";
import { toast } from "sonner";

interface RegisteredLead {
  id: string;
  client: string;
  useCase: string;
  arr: string;
}

const ARR_LABEL: Record<string, string> = {
  small: "Under $100K",
  mid: "$100K – $500K",
  large: "$500K+",
};

export default function DealRegistrationPage() {
  const [leads, setLeads] = React.useState<RegisteredLead[]>([]);
  const [arr, setArr] = React.useState("mid");

  function handleRegisterLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const client = (form.elements.namedItem("client") as HTMLInputElement)?.value || "New Client";
    const useCase = (form.elements.namedItem("useCase") as HTMLTextAreaElement)?.value || "Use case pending";
    setLeads((prev) => [{ id: `d-${Date.now()}`, client, useCase, arr }, ...prev]);
    form.reset();
    setArr("mid");
    toast.success(`${client} added to the deal pipeline.`);
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/sales-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Sales Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <FilePlus2 className="size-5 text-primary" />
          Deal Registration
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Register a new lead and get it into the pipeline.</p>
      </div>

      <Card className="shadow-card p-6">
        <h2 className="mb-4 text-sm font-medium text-foreground">Register a Lead</h2>
        <form onSubmit={handleRegisterLead} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input name="client" placeholder="Client name" required />
          <Select value={arr} onValueChange={setArr}>
            <SelectTrigger>
              <SelectValue placeholder="Estimated ARR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Under $100K</SelectItem>
              <SelectItem value="mid">$100K &ndash; $500K</SelectItem>
              <SelectItem value="large">$500K+</SelectItem>
            </SelectContent>
          </Select>
          <Textarea name="useCase" placeholder="Use case summary" className="sm:col-span-2" rows={3} />
          <Button type="submit" className="sm:w-fit">
            Register Deal
          </Button>
        </form>
      </Card>

      {leads.length > 0 && (
        <Card className="shadow-card p-6">
          <h2 className="mb-4 text-sm font-medium text-foreground">Recently Registered</h2>
          <div className="space-y-2">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{lead.client}</p>
                  <p className="truncate text-xs text-muted-foreground">{lead.useCase}</p>
                </div>
                <Badge variant="secondary">{ARR_LABEL[lead.arr]}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
