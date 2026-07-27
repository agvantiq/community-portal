import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMMUNITY_CONTRIBUTION_BY_USER } from "@/lib/sample-data";
import { Trophy, MessageSquare, CalendarCheck } from "lucide-react";

export default function LeaderboardPage() {
  const ranked = [...COMMUNITY_CONTRIBUTION_BY_USER].sort((a, b) => b.leaderboardPts - a.leaderboardPts);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/forum" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Community Dashboard
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Trophy className="size-5 text-primary" />
          Leaderboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Top contributors across the partner community, ranked by activity this quarter.
        </p>
      </div>

      <Card className="shadow-card p-6">
        <div className="space-y-2">
          {ranked.map((row, i) => (
            <div
              key={row.user}
              className="flex items-center gap-4 rounded-md border border-border p-4"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {i === 0 ? <Trophy className="size-4 text-warning" /> : i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{row.user}</p>
                <p className="truncate text-xs text-muted-foreground">{row.org}</p>
              </div>
              <div className="hidden shrink-0 items-center gap-4 text-xs text-muted-foreground sm:flex">
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-3.5" />
                  {row.discussionsCreated}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarCheck className="size-3.5" />
                  {row.eventRsvps}
                </span>
              </div>
              <Badge variant="secondary" className="shrink-0 bg-success/10 text-success">
                {row.leaderboardPts.toLocaleString()} pts
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
