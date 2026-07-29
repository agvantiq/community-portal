"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Award,
  Bell,
  Briefcase,
  CheckCircle2,
  Mail,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  CERTIFICATION_THRESHOLD,
  COURSE_COLUMNS,
  INITIAL_EMPLOYEES,
  countCompletions,
  courseStats,
  initials,
  type CourseKey,
  type Employee,
} from "@/lib/org-roster";
import { DEALS, type Deal } from "@/lib/sample-data";

const stageTone: Record<Deal["stage"], string> = {
  Discovery: "bg-info/10 text-info",
  "Technical Validation": "bg-info/10 text-info",
  Proposal: "bg-emphasis/10 text-emphasis",
  Negotiation: "bg-emphasis/10 text-emphasis",
  "Closed Won": "bg-success/10 text-success",
};

function ProgressCell({ value }: { value?: number }) {
  if (value === undefined) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }
  if (value >= 100) {
    return (
      <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
        <CheckCircle2 className="size-3" />
        Complete
      </Badge>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-info" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{value}%</span>
    </div>
  );
}

export function ExecDashboard({ firstName }: { firstName: string }) {
  const [employees, setEmployees] = React.useState<Employee[]>(INITIAL_EMPLOYEES);
  const [addOpen, setAddOpen] = React.useState(false);
  const [emailDigest, setEmailDigest] = React.useState(true);
  const [newName, setNewName] = React.useState("");
  const [newTrack, setNewTrack] = React.useState<"technical" | "sales">("technical");

  const totalCompletions = React.useMemo(() => countCompletions(employees), [employees]);
  const certPercent = Math.min(100, Math.round((totalCompletions / CERTIFICATION_THRESHOLD) * 100));
  const isCertified = totalCompletions >= CERTIFICATION_THRESHOLD;

  const techCount = employees.filter((e) => e.track === "technical").length;
  const salesCount = employees.filter((e) => e.track === "sales").length;
  const notStarted = employees.filter((e) => Object.keys(e.progress).length === 0);

  const recentCompletion = React.useMemo(() => {
    for (const emp of employees) {
      const courseKey = Object.entries(emp.progress).find(([, v]) => v === 100)?.[0] as
        | CourseKey
        | undefined;
      if (courseKey) {
        const course = COURSE_COLUMNS.find((c) => c.key === courseKey);
        return { name: emp.name, course: course?.label ?? courseKey };
      }
    }
    return null;
  }, [employees]);

  function handleAddEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newName.trim()) return;
    const id = `emp-${newTrack}-${Date.now()}`;
    setEmployees((prev) => [...prev, { id, name: newName.trim(), track: newTrack, progress: {} }]);
    toast.success(`${newName.trim()} added to the roster.`);
    setNewName("");
    setNewTrack("technical");
    setAddOpen(false);
  }

  function handleRemoveEmployee(id: string, name: string) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    toast.success(`Removed ${name} from the roster.`);
  }

  return (
    <div className="space-y-6">
      <PageHero
        title="Organization Certification"
        description={`Hi ${firstName} — every course your team completes counts toward your org's Vantiq certification. Track individual progress below and manage who's enrolled.`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="shadow-card p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-emphasis">Certification Progress</h2>
            <Badge
              variant="secondary"
              className={isCertified ? "bg-success/10 text-success" : "bg-info/10 text-info"}
            >
              {isCertified ? "Certified" : "In Progress"}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="flex size-16 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--primary) ${certPercent}%, var(--muted) 0)`,
              }}
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-card text-sm font-semibold">
                {certPercent}%
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {totalCompletions} / {CERTIFICATION_THRESHOLD}
                <span className="ml-1 font-normal text-muted-foreground">course completions</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Threshold agreed with Vantiq for company-level certification.
              </p>
            </div>
          </div>
          <Progress value={certPercent} className="mt-4 h-1.5" />
        </Card>

        <Card className="shadow-card p-6 lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-emphasis">
            <Users className="size-4 text-primary" />
            Team Overview
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total employees</p>
              <p className="text-lg font-semibold text-foreground">{employees.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Not yet started</p>
              <p className="text-lg font-semibold text-foreground">{notStarted.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tech partners</p>
              <p className="text-lg font-semibold text-foreground">{techCount}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sales partners</p>
              <p className="text-lg font-semibold text-foreground">{salesCount}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="shadow-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-medium text-emphasis">
            <Bell className="size-4 text-primary" />
            Notifications
          </h2>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="size-3.5" />
            Weekly email digest
            <Switch
              checked={emailDigest}
              onCheckedChange={(checked) => {
                setEmailDigest(checked);
                toast.success(checked ? "Weekly email digest turned on." : "Weekly email digest turned off.");
              }}
            />
          </label>
        </div>
        <div className="space-y-2">
          {recentCompletion && (
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
              <div className="flex size-8 shrink-0 items-center justify-center text-success">
                <CheckCircle2 className="size-4" />
              </div>
              <p className="text-sm text-foreground">
                <span className="font-medium">{recentCompletion.name}</span> completed{" "}
                <span className="font-medium">{recentCompletion.course}</span>
              </p>
            </div>
          )}
          <div className="flex items-center gap-3 rounded-md border border-border p-3">
            <div className="flex size-8 shrink-0 items-center justify-center text-info">
              <Award className="size-4" />
            </div>
            <p className="text-sm text-foreground">
              Organization is <span className="font-medium">{certPercent}%</span> of the way to
              certification ({totalCompletions} / {CERTIFICATION_THRESHOLD} completions).
            </p>
          </div>
          {notStarted.length > 0 && (
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
              <div className="flex size-8 shrink-0 items-center justify-center text-warning">
                <Users className="size-4" />
              </div>
              <p className="text-sm text-foreground">
                <span className="font-medium">{notStarted.length}</span>{" "}
                {notStarted.length === 1 ? "employee hasn't" : "employees haven't"} started a course
                yet.
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="shadow-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-emphasis">Team Roster</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{employees.length} people enrolled</p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="size-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogDescription>
                  They&apos;ll appear on the roster unenrolled — progress updates automatically as
                  they complete courses in the Learning Hub.
                </DialogDescription>
              </DialogHeader>
              <form id="add-employee-form" onSubmit={handleAddEmployee} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="employee-name">Name</Label>
                  <Input
                    id="employee-name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Jamie Torres"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="employee-track">Track</Label>
                  <Select value={newTrack} onValueChange={(v) => setNewTrack(v as "technical" | "sales")}>
                    <SelectTrigger id="employee-track" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Partner</SelectItem>
                      <SelectItem value="sales">Sales Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
              <DialogFooter>
                <Button type="submit" form="add-employee-form">
                  Add to Roster
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="max-h-[520px] overflow-auto rounded-md border border-border [&>[data-slot=table-container]]:overflow-visible">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky top-0 left-0 z-20 bg-card">Employee</TableHead>
                {COURSE_COLUMNS.map((course) => (
                  <TableHead key={course.key} className="sticky top-0 z-10 bg-card">
                    {course.shortLabel}
                  </TableHead>
                ))}
                <TableHead className="sticky top-0 z-10 bg-card text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="sticky left-0 z-10 bg-card">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {initials(emp.name)}
                      </div>
                      <span className="font-medium text-foreground">{emp.name}</span>
                    </div>
                  </TableCell>
                  {COURSE_COLUMNS.map((course) => (
                    <TableCell key={course.key}>
                      <ProgressCell value={emp.progress[course.key]} />
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() => handleRemoveEmployee(emp.id, emp.name)}
                      aria-label={`Remove ${emp.name}`}
                    >
                      <X className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="sticky bottom-0 left-0 z-20 bg-muted/50 font-medium text-foreground">
                  Course Completion
                </TableCell>
                {COURSE_COLUMNS.map((course) => {
                  const stats = courseStats(employees, course.key);
                  return (
                    <TableCell
                      key={course.key}
                      className="sticky bottom-0 z-10 bg-muted/50 text-xs text-muted-foreground"
                    >
                      {stats.completed}/{stats.enrolled} complete
                    </TableCell>
                  );
                })}
                <TableCell className="sticky bottom-0 z-10 bg-muted/50" />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Card>

      <div className="flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="flex items-center gap-2 text-sm font-medium text-emphasis">
            <Briefcase className="size-4 text-primary" />
            Registered Deals
          </h2>
          <Badge variant="secondary">{DEALS.length}</Badge>
        </div>
        <Card className="shadow-card overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Use Case</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Stage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEALS.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium text-foreground">{deal.client}</TableCell>
                  <TableCell className="text-muted-foreground">{deal.useCase}</TableCell>
                  <TableCell className="text-muted-foreground">{deal.owner}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={stageTone[deal.stage]}>
                      {deal.stage}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
