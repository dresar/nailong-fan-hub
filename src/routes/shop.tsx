import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { products } from "@/data/mock";
import { Star } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop — Nailong Fan Hub" }] }),
  component: Shop,
});

function Shop() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="Merch" title="Toko Merchandise 🛍️" subtitle="Plush, kaos, mug, dan koleksi resmi Nailong." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link key={p.id} to="/shop/$productId" params={{ productId: p.id }}>
            <Card className="overflow-hidden p-0 transition hover:nailong-glow">
              <img src={p.img} alt={p.name} className="h-56 w-full object-cover" loading="lazy" />
              <div className="p-4">
                <div className="font-semibold">{p.name}</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="font-display text-lg font-bold text-primary">Rp {p.price.toLocaleString("id")}</div>
                  <div className="flex items-center gap-1 text-xs"><Star className="h-3 w-3 fill-primary text-primary" />{p.rating.toFixed(1)}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PublicLayout>
  );
}
