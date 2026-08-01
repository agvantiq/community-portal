"use client";

import * as React from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRole } from "@/components/shell/role-provider";
import { useContentRequests } from "@/lib/content-requests";
import { Mail } from "lucide-react";
import { toast } from "sonner";

// Frontend-only prototype — there's no mail server behind this. Submitting
// simulates the send the same way every other "send"-style action in the
// portal does (newsletter subscribe, Q&A post, event comment): a real,
// working form and a toast confirmation, no actual email dispatched. The
// request itself is persisted so Vantiq Admin can track it on the Dashboard.
export function ContentRequestDialog({
  source,
  dialogDescription,
  requestTypes,
}: {
  /** Which hub this request comes from — shown to Vantiq Admin, e.g. "Developer Hub". */
  source: string;
  dialogDescription: string;
  requestTypes: string[];
}) {
  const { info } = useRole();
  const { addRequest } = useContentRequests();
  const [open, setOpen] = React.useState(false);
  const [requestType, setRequestType] = React.useState(requestTypes[0]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const details = (form.elements.namedItem("details") as HTMLTextAreaElement).value;
    addRequest({
      source,
      requestType,
      subject,
      details,
      submittedByName: info.user.name,
      submittedByEmail: info.user.email,
    });
    form.reset();
    setRequestType(requestTypes[0]);
    setOpen(false);
    toast.success("Your request has been submitted.", {
      description: `We'll follow up at ${info.user.email} if more detail is needed.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Mail className="size-4" />
          Submit a Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit a Request</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <form id="content-request-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cr-type">Request Type</Label>
            <Select value={requestType} onValueChange={setRequestType}>
              <SelectTrigger id="cr-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {requestTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cr-subject">Subject</Label>
            <Input id="cr-subject" name="subject" placeholder="Short summary of your request" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cr-details">Details</Label>
            <Textarea
              id="cr-details"
              name="details"
              rows={5}
              placeholder="What are you looking for, and why would it help?"
              required
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="content-request-form">
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
