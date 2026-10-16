import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary-vivid">
        <Compass className="size-6" />
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          You've gone off the map
        </h1>
        <p className="text-sm text-muted-foreground">
          This page doesn't exist, or it moved somewhere we haven't charted yet.
        </p>
      </div>
      <Button asChild className="mt-2">
        <Link href="/">Back to the Dashboard</Link>
      </Button>
    </div>
  );
}
