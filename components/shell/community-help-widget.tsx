"use client";

import * as React from "react";
import { ChevronDown, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function ChatSmileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H9l-4 3.5V17H6.5A2.5 2.5 0 0 1 4 14.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="9.5" r="1.1" fill="currentColor" />
      <circle cx="14.5" cy="9.5" r="1.1" fill="currentColor" />
      <path
        d="M8.5 12.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function WinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.5" cy="9" r="1.75" fill="currentColor" />
      <line x1="15" y1="9" x2="18.5" y2="9" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path
        d="M6 14c1.5 3 4.5 4.5 7.5 4.5S18.5 17 20 14"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Search-assist for the portal itself — not a coding/dev assistant. Scope is
// deliberately "help me find it on this site" (docs, courses, forum threads,
// sales resources), for when the search bar alone doesn't surface it.
export function CommunityHelpWidget() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            data-tour="portal-help"
            className="size-14 rounded-full shadow-lg"
            aria-label={open ? "Close Community Portal Help" : "Open Community Portal Help"}
          >
            {open ? <ChevronDown className="size-6" /> : <ChatSmileIcon className="size-6" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          sideOffset={12}
          className="flex min-h-[560px] w-80 flex-col gap-0 overflow-hidden p-0 sm:w-96"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <WinkIcon className="size-4" />
              Community Portal Help
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-[85%] rounded-lg bg-muted p-3 text-sm text-foreground">
              Hi there! I&apos;m Community Portal Help. When the search bar doesn&apos;t turn up
              what you&apos;re after, ask me to help you find it here on the portal — courses,
              docs, forum threads, sales resources, and more. What are you looking for?
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast("Community Portal Help is coming soon.");
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <Input placeholder="Ask a question..." className="h-9" />
            <Button type="submit" size="icon" className="size-9 shrink-0" aria-label="Send">
              <Send className="size-4" />
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
