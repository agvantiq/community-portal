"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  CheckCircle2,
  Search,
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
  const [newName, setNewName] = React.useState("");
  const [newTrack, setNewTrack] = React.useState<"technical" | "sales">("technical");
  const [rosterQuery, setRosterQuery] = React.useState("");

  const filteredEmployees = React.useMemo(() => {
    const query = rosterQuery.trim().toLowerCase();
    if (!query) return employees;
    return employees.filter((e) => e.name.toLowerCase().includes(query));
  }, [employees, rosterQuery]);

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
          <SectionHeading
            action={
              <Badge
                variant="secondary"
                className={isCertified ? "bg-success/10 text-success" : "bg-info/10 text-info"}
              >
                {isCertified ? "Certified" : "In Progress"}
              </Badge>
            }
          >
            Certification Progress
          </SectionHeading>
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

        <Card className="p-6 lg:col-span-2">
          <SectionHeading icon={<Users className="size-4 text-primary" />}>Team Overview</SectionHeading>
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

      <Card className="p-6">
        <SectionHeading icon={<Bell className="size-4 text-primary" />}>Notifications</SectionHeading>
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
              <div className="flex size-8 shrink-0 items-center justify-center text-emphasis">
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
        <SectionHeading
          description={`${employees.length} people enrolled`}
          action={
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={rosterQuery}
                  onChange={(e) => setRosterQuery(e.target.value)}
                  placeholder="Search roster…"
                  aria-label="Search roster by name"
                  className="h-9 w-40 pl-8 sm:w-48"
                />
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
          }
        >
          User Management
        </SectionHeading>

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
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={COURSE_COLUMNS.length + 2} className="text-center text-sm text-muted-foreground">
                    No one matches &ldquo;{rosterQuery}&rdquo;.
                  </TableCell>
                </TableRow>
              )}
              {filteredEmployees.map((emp) => (
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon-sm" variant="outline" aria-label={`Remove ${emp.name}`}>
                          <X className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove {emp.name} from the roster?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Their course progress won&apos;t count toward org certification anymore. This
                            can&apos;t be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveEmployee(emp.id, emp.name)}>
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
    </div>
  );
}
