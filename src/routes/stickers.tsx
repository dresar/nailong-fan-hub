import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { NAILONG_IMAGES } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/stickers")({
  head: () => ({ meta: [{ title: "Sticker Pack — Nailong Fan Hub" }] }),
  component: Stickers,
});

const packs = Array.from({ length: 6 }, (_, i) => ({
  id: `pk-${i + 1}`,
  name: ["Angry Pack", "Happy Pack", "Reaction Pack", "Mama Long Pack", "Daily Pack", "Premium Pack"][i],
  count: 12 + i * 4,
  cover: NAILONG_IMAGES[i % 2],
}));

function Stickers() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="Pack" title="Sticker Nailong 🌟" subtitle="Download dan pakai di WhatsApp, Telegram, atau Discord." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {packs.map((p) => (
          <Card key={p.id} className="overflow-hidden p-0">
            <img src={p.cover} alt={p.name} className="h-48 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <div className="font-display text-lg font-bold">{p.name}</div>
              <div className="text-sm text-muted-foreground">{p.count} stiker</div>
              <Button onClick={() => toast.success(`${p.name} sedang diunduh...`)} className="mt-3 w-full rounded-full">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </PublicLayout>
  );
}
