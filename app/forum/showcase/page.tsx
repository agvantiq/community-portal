"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import {
  Search,
  Wrench,
  LayoutTemplate,
  LayoutGrid,
  Boxes,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

const SHOWCASE_CATEGORIES = ["Internal Tools", "Portals", "Directory", "Other", "AI"] as const;
type ShowcaseCategory = (typeof SHOWCASE_CATEGORIES)[number];

interface ShowcaseProject {
  id: string;
  title: string;
  org: string;
  description: string;
  category: ShowcaseCategory;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "fleet-ops-console",
    title: "Fleet Ops Console",
    org: "Radenta Tech",
    description:
      "Internal dispatch and maintenance console for a 400-vehicle logistics fleet, built entirely in VAIL with live GPS telemetry.",
    category: "Internal Tools",
  },
  {
    id: "partner-deal-room",
    title: "Partner Deal Room",
    org: "SoftServe",
    description:
      "Self-serve portal where enterprise clients track proposal status, sign SOWs, and message their delivery team in real time.",
    category: "Portals",
  },
  {
    id: "extension-directory",
    title: "Vantiq Extension Directory",
    org: "NTT Data",
    description:
      "Searchable catalog of every community-built connector and extension source, with install counts and compatibility tags.",
    category: "Directory",
  },
  {
    id: "cold-chain-sentinel",
    title: "Cold-Chain Sentinel",
    org: "Wipro Mfg",
    description:
      "Computer-vision anomaly detection for refrigerated trucks, flagging seal breaches before spoilage occurs.",
    category: "AI",
  },
  {
    id: "shift-swap-board",
    title: "Shift Swap Board",
    org: "Cognizant Tech",
    description:
      "Internal scheduling tool letting hospital staff trade shifts with manager approval built into the workflow.",
    category: "Internal Tools",
  },
  {
    id: "grid-signal-explorer",
    title: "Grid Signal Explorer",
    org: "Infosys Cloud",
    description:
      "Public dashboard visualizing real-time load-balancing decisions across a utility's edge network.",
    category: "Other",
  },
];

const CATEGORY_STYLE: Record<ShowcaseCategory, { icon: LucideIcon; bg: string; text: string }> = {
  "Internal Tools": { icon: Wrench, bg: "bg-info/10", text: "text-info" },
  Portals: { icon: LayoutTemplate, bg: "bg-emphasis/10", text: "text-emphasis" },
  Directory: { icon: LayoutGrid, bg: "bg-primary/10", text: "text-primary" },
  Other: { icon: Boxes, bg: "bg-muted", text: "text-muted-foreground" },
  AI: { icon: Bot, bg: "bg-emphasis/10", text: "text-emphasis" },
};

export default function CommunityShowcasePage() {
  const [projects, setProjects] = React.useState<ShowcaseProject[]>(SHOWCASE_PROJECTS);
  const [showcaseQuery, setShowcaseQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<ShowcaseCategory | "All">("All");
  const [submitOpen, setSubmitOpen] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState<ShowcaseCategory>("Internal Tools");

  const filteredProjects = React.useMemo(() => {
    let list = projects;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (showcaseQuery.trim()) {
      const q = showcaseQuery.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.org.toLowerCase().includes(q)
      );
    }
    return list;
  }, [projects, activeCategory, showcaseQuery]);

  function handleSubmitProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement)?.value.trim();
    const org = (form.elements.namedItem("org") as HTMLInputElement)?.value.trim();
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement)?.value.trim();
    if (!title || !org) return;
    setProjects((prev) => [
      { id: `showcase-${Date.now()}`, title, org, description: description || "No description provided.", category: newCategory },
      ...prev,
    ]);
    form.reset();
    setNewCategory("Internal Tools");
    setSubmitOpen(false);
    toast.success(`${title} was added to Solutions Showcasing.`);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Solutions Showcasing"
        description="Real projects partners have shipped on Vantiq."
      >
        <BookmarkButton
          item={{
            id: "/forum/showcase",
            label: "Solutions Showcasing",
            href: "/forum/showcase",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={showcaseQuery}
            onChange={(e) => setShowcaseQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
          <DialogTrigger asChild>
            <Button className="sm:w-fit">Submit Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit a project</DialogTitle>
              <DialogDescription>
                Share something you&apos;ve built on Vantiq with the community.
              </DialogDescription>
            </DialogHeader>
            <form id="submit-project-form" onSubmit={handleSubmitProject} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="project-title">Project name</Label>
                <Input id="project-title" name="title" placeholder="Fleet Ops Console" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="project-org">Your organization</Label>
                <Input id="project-org" name="org" placeholder="Radenta Tech" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="project-category">Category</Label>
                <Select value={newCategory} onValueChange={(v) => setNewCategory(v as ShowcaseCategory)}>
                  <SelectTrigger id="project-category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SHOWCASE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" name="description" placeholder="What does it do?" rows={3} />
              </div>
            </form>
            <DialogFooter>
              <Button type="submit" form="submit-project-form">
                Submit Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Filter by</p>
        <div className="flex flex-wrap gap-2">
          {(["All", ...SHOWCASE_CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => {
          const style = CATEGORY_STYLE[project.category];
          const Icon = style.icon;
          return (
            <Card
              key={project.id}
              className="shadow-card gap-0 overflow-hidden p-0 transition-colors hover:border-primary"
            >
              <div className={`relative flex h-36 flex-col justify-between p-4 ${style.bg}`}>
                <Badge variant="secondary" className="w-fit border-none bg-card text-foreground shadow-card">
                  {project.category}
                </Badge>
                <div className="flex size-11 items-center justify-center self-center rounded-xl bg-card shadow-card">
                  <Icon className={`size-5 ${style.text}`} />
                </div>
                <div />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-foreground">{project.title}</p>
                <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
                <Badge variant="secondary" className="mt-3">
                  {project.org}
                </Badge>
              </div>
            </Card>
          );
        })}
        {filteredProjects.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">No projects match.</p>
        )}
      </div>
    </div>
  );
}
