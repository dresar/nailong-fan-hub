import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { collectionItems } from "@/data/mock";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/my-collection")({
  head: () => ({ meta: [{ title: "Koleksiku — Nailong Fan Hub" }] }),
  component: Collection,
});

const rarityColor: Record<string, string> = {
  Common: "bg-muted",
  Rare: "bg-mint/30 text-foreground",
  Epic: "bg-accent/30 text-foreground",
  Legendary: "bg-primary text-primary-foreground",
};

function Collection() {
  const owned = collectionItems.filter((c) => c.owned).length;
  const pct = (owned / collectionItems.length) * 100;
  return (
    <PublicLayout>
      <PageHeader eyebrow="Album" title="Koleksi Nailong-ku 🐲" subtitle="Kumpulkan semua kartu Nailong! Dari Common sampai Legendary." />
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <Card className="mb-6 p-6">
          <div className="flex justify-between text-sm font-semibold"><span>Progress Koleksi</span><span>{owned}/{collectionItems.length}</span></div>
          <Progress value={pct} className="mt-2 h-3" />
        </Card>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="owned">Dimiliki</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          {(["all", "owned", "wishlist"] as const).map((t) => (
            <TabsContent key={t} value={t}>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {collectionItems
                  .filter((c) => t === "all" || (t === "owned" ? c.owned : !c.owned))
                  .map((c) => (
                    <Card key={c.id} className={`overflow-hidden p-0 ${!c.owned ? "opacity-60" : ""}`}>
                      <div className="relative">
                        <img src={c.img} alt={c.name} className="aspect-square w-full object-cover" loading="lazy" />
                        {!c.owned && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Lock className="h-8 w-8 text-white" /></div>}
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-semibold">{c.name}</div>
                        <Badge className={`mt-1 ${rarityColor[c.rarity]}`}>{c.rarity}</Badge>
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
