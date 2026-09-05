import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/mock";
import { Star, ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$productId")({
  component: Product,
});

function Product() {
  const { productId } = Route.useParams();
  const p = products.find((x) => x.id === productId);
  if (!p) throw notFound();
  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Button asChild variant="ghost" size="sm"><Link to="/shop"><ArrowLeft className="mr-2 h-4 w-4" />Shop</Link></Button>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <Card className="overflow-hidden p-0"><img src={p.img} alt={p.name} className="w-full object-cover" /></Card>
          <div>
            <h1 className="font-display text-3xl font-bold">{p.name}</h1>
            <div className="mt-2 flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" /><span className="font-semibold">{p.rating.toFixed(1)}</span><span className="text-muted-foreground">• Stok: {p.stock}</span></div>
            <div className="mt-6 font-display text-4xl font-bold text-primary">Rp {p.price.toLocaleString("id")}</div>
            <p className="mt-4 text-muted-foreground">Merchandise resmi (tidak resmi) dari fan hub. Kualitas premium, kelucuan maksimal. Cocok untuk koleksi pribadi atau hadiah sesama fans.</p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => toast.success(`${p.name} ditambahkan ke keranjang!`)} className="rounded-full"><ShoppingCart className="mr-2 h-4 w-4" />Tambah Keranjang</Button>
              <Button variant="outline" className="rounded-full"><Heart className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
