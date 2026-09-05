import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Calendar, ShoppingBag, Film } from "lucide-react";
import { useAdminEpisodes, useAdminNews, useAdminProducts, useAdminEvents } from "@/lib/queries";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: episodes } = useAdminEpisodes();
  const { data: news } = useAdminNews();
  const { data: products } = useAdminProducts();
  const { data: events } = useAdminEvents();

  const stats = [
    { icon: Film, label: "Total Episode", value: episodes?.length || "0", color: "text-purple-500" },
    { icon: Newspaper, label: "Berita Rilis", value: news?.length || "0", color: "text-orange-500" },
    { icon: ShoppingBag, label: "Produk Toko", value: products?.length || "0", color: "text-green-500" },
    { icon: Calendar, label: "Total Event", value: events?.length || "0", color: "text-blue-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl font-bold">Ringkasan Panel</h1>
        <div className="text-sm text-muted-foreground">Update terakhir: {new Date().toLocaleDateString()}</div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="group relative overflow-hidden p-6 transition-all hover:shadow-lg hover:nailong-glow">
            <div className={`absolute -right-4 -top-4 opacity-10 transition-transform group-hover:scale-110`}>
              <s.icon className="h-24 w-24" />
            </div>
            <s.icon className={`h-6 w-6 ${s.color}`} />
            <div className="mt-4 text-sm text-muted-foreground">{s.label}</div>
            <div className="font-display text-3xl font-bold">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 flex flex-col items-center justify-center text-center min-h-[300px]">
          <Film className="h-16 w-16 text-muted-foreground/20 mb-4" />
          <h2 className="font-display text-2xl font-bold">Selamat Datang di Hub Fans Nailong</h2>
          <p className="mt-2 text-muted-foreground max-w-md">
            Gunakan panel ini untuk mengelola konten media, berita terbaru, dan produk merchandise untuk komunitas Nailong.
          </p>
          <div className="mt-6 flex gap-3">
            <Button className="rounded-full" asChild><Link to="/admin/content">Kelola Konten</Link></Button>
            <Button variant="outline" className="rounded-full" asChild><Link to="/admin/news">Tulis Berita</Link></Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-6 font-display text-xl font-bold">Aktivitas Terakhir</h2>
          <div className="space-y-6">
            {[
              { t: "Episode baru dirilis", time: "2j lalu", icon: Film, c: "bg-purple-100 text-purple-600" },
              { t: "Update stok toko", time: "5j lalu", icon: ShoppingBag, c: "bg-green-100 text-green-600" },
              { t: "Berita dipublikasikan", time: "1h lalu", icon: Newspaper, c: "bg-orange-100 text-orange-600" },
              { t: "Event diperbarui", time: "2h lalu", icon: Calendar, c: "bg-blue-100 text-blue-600" },
            ].map((a, i) => (
              <div key={i} className="flex gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.c}`}>
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold">{a.t}</p>
                </div>
                <div className="text-[10px] text-muted-foreground uppercase">{a.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
