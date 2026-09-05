import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEpisodes } from "@/lib/queries";
import { Play } from "lucide-react";

export const Route = createFileRoute("/watch")({
  head: () => ({ meta: [{ title: "Nonton Episode — Nailong Fan Hub" }] }),
  component: Watch,
});

function Watch() {
  const { data: episodes = [] } = useEpisodes();
  return (
    <PublicLayout>
      <PageHeader eyebrow="Album" title="Nonton Nailong 🎬" subtitle="Semua episode lucu Nailong, gratis & lengkap." />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <Tabs defaultValue="1">
          <TabsList>
            <TabsTrigger value="1">Season 1</TabsTrigger>
            <TabsTrigger value="2">Season 2</TabsTrigger>
          </TabsList>
          {[1, 2].map((s) => (
            <TabsContent key={s} value={String(s)}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {episodes.filter((e) => e.season === s).map((ep) => (
                  <Link key={ep.id} to="/watch/$episodeId" params={{ episodeId: ep.id }}>
                    <Card className="group overflow-hidden p-0 transition hover:nailong-glow">
                      <div className="relative">
                        <img src={ep.thumb} alt={ep.title} className="h-44 w-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="font-display font-bold">{ep.title}</div>
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>{ep.duration}</span><span>{ep.views} views</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PublicLayout>
  );
}
