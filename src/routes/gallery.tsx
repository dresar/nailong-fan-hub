import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { galleryItems } from "@/data/mock";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Galeri — Nailong Fan Hub" }] }),
  component: Gallery,
});

const cats = ["all", "screenshot", "fanart", "official", "behind-scene"] as const;

function Gallery() {
  const [cat, setCat] = useState<(typeof cats)[number]>("all");
  const [open, setOpen] = useState<string | null>(null);
  const items = cat === "all" ? galleryItems : galleryItems.filter((i) => i.category === cat);
  const active = galleryItems.find((i) => i.id === open);

  return (
    <PublicLayout>
      <PageHeader eyebrow="Album" title="Galeri Nailong 📸" subtitle="Kumpulan foto, fanart, dan momen ikonik." />
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <Button key={c} variant={cat === c ? "default" : "outline"} size="sm" className="rounded-full capitalize" onClick={() => setCat(c)}>
              {c}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((it) => (
            <button key={it.id} onClick={() => setOpen(it.id)} className="group relative overflow-hidden rounded-2xl">
              <img src={it.img} alt={it.title} className="aspect-square w-full object-cover transition group-hover:scale-110" loading="lazy" />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 text-left text-xs font-semibold text-white">{it.title}</div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-3xl p-0">
          <DialogTitle className="sr-only">{active?.title}</DialogTitle>
          {active && <img src={active.img} alt={active.title} className="w-full rounded-lg" />}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
}
