import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Upload } from "lucide-react";
import { memes as initialMemes } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/memes")({
  head: () => ({ meta: [{ title: "Meme Hub — Nailong Fan Hub" }] }),
  component: Memes,
});

function Memes() {
  const [memes, setMemes] = useState(initialMemes);
  const toggleLike = (id: string) =>
    setMemes((m) => m.map((x) => (x.id === id ? { ...x, likes: x.likes + 1 } : x)));

  return (
    <PublicLayout>
      <PageHeader eyebrow="Hub" title="Meme Reaction Nailong 😂" subtitle="Kumpulan meme reaction terlengkap. Like favoritmu!" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex justify-end">
          <Button onClick={() => toast.success("Upload meme dummy berhasil! 🎉")} className="rounded-full">
            <Upload className="mr-2 h-4 w-4" /> Upload Meme
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {memes.map((m) => (
            <Card key={m.id} className="overflow-hidden p-0">
              <img src={m.img} alt={m.title} className="aspect-square w-full object-cover" loading="lazy" />
              <div className="flex items-center justify-between p-3">
                <div>
                  <div className="text-sm font-semibold">{m.title}</div>
                  <div className="text-xs text-muted-foreground">#{m.tag}</div>
                </div>
                <button onClick={() => toggleLike(m.id)} className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold hover:bg-primary/30">
                  <Heart className="h-3 w-3" /> {m.likes}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
