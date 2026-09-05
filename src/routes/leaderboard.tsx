import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { leaderboard } from "@/data/mock";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [{ title: "Top Fans — Nailong Fan Hub" }] }),
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="Ranking" title="Top Fans Nailong 🏆" subtitle="Fan paling aktif & berdedikasi minggu ini." />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="space-y-2">
          {leaderboard.map((l) => (
            <Card key={l.rank} className={`flex items-center gap-4 p-4 ${l.rank === 1 ? "border-primary bg-primary/10" : ""}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-display font-bold ${l.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {l.rank === 1 ? <Trophy className="h-5 w-5" /> : l.rank}
              </div>
              <img src={l.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{l.name}</div>
                <Badge variant="secondary" className="mt-1">{l.badge}</Badge>
              </div>
              <div className="font-display text-xl font-bold text-primary">{l.points.toLocaleString()}</div>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
