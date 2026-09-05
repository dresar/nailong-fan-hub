import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NAILONG_IMAGES } from "@/data/mock";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/wallpapers")({
  head: () => ({ meta: [{ title: "Wallpapers — Nailong Fan Hub" }] }),
  component: Wallpapers,
});

const wp = Array.from({ length: 12 }, (_, i) => ({
  id: `wp-${i + 1}`,
  img: NAILONG_IMAGES[i % 2],
  type: i % 2 === 0 ? "desktop" : "mobile",
}));

function Wallpapers() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="HD" title="Wallpaper Nailong 🖼️" subtitle="Hiasi layarmu dengan kuningnya Nailong." />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
          {(["all", "desktop", "mobile"] as const).map((t) => (
            <TabsContent key={t} value={t}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wp.filter((w) => t === "all" || w.type === t).map((w) => (
                  <Card key={w.id} className="overflow-hidden p-0">
                    <img src={w.img} alt="" className={t === "mobile" || w.type === "mobile" ? "aspect-[9/16] w-full object-cover" : "aspect-video w-full object-cover"} loading="lazy" />
                    <div className="flex items-center justify-between p-3">
                      <span className="text-sm capitalize">{w.type}</span>
                      <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast.success("Wallpaper diunduh!")}>
                        <Download className="mr-1 h-3 w-3" /> Unduh
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PublicLayout>
  );
}
