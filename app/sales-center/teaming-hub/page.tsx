"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEAMING_REQUESTS } from "@/lib/sales-data";
import { Users2 } from "lucide-react";
import { toast } from "sonner";

export default function DealTeamingHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/sales-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Sales Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Users2 className="size-5 text-primary" />
          Deal Teaming Hub
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find a partner to team up with on an active opportunity.
        </p>
      </div>

      <Card className="shadow-card p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TEAMING_REQUESTS.map((req) => (
            <div key={req.label} className="rounded-md border border-border p-4">
              <Users2 className="size-5 text-primary" />
              <p className="mt-2 text-sm font-medium text-foreground">{req.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{req.detail}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() => toast(`Team-up proposal sent for: ${req.label}`)}
              >
                Propose Team-Up
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
