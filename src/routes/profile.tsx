import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { collectionItems } from "@/data/mock";
import nailong from "@/assets/nailong-happy.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profil — Nailong Fan Hub" }] }),
  component: Profile,
});

function Profile() {
  const { user } = useAuth();
  if (!user) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Belum login</h1>
          <p className="mt-2 text-muted-foreground">Silakan masuk untuk melihat profil.</p>
          <Button asChild className="mt-4 rounded-full"><Link to="/login">Masuk</Link></Button>
        </div>
      </PublicLayout>
    );
  }
  const owned = collectionItems.filter((c) => c.owned).slice(0, 4);
  return (
    <PublicLayout>
      <PageHeader eyebrow="Profil" title={user.name} subtitle={user.email} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 lg:grid-cols-[300px_1fr]">
        <Card className="p-6 text-center">
          <img src={nailong} alt="" className="mx-auto h-32 w-32 rounded-full object-cover nailong-glow" />
          <div className="mt-4 font-display text-xl font-bold">{user.name}</div>
          <Badge className="mt-2">{user.role === "admin" ? "Admin" : "Fan Aktif"}</Badge>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div><div className="font-bold text-primary">42</div><div className="text-xs text-muted-foreground">Posts</div></div>
            <div><div className="font-bold text-primary">128</div><div className="text-xs text-muted-foreground">Likes</div></div>
            <div><div className="font-bold text-primary">12</div><div className="text-xs text-muted-foreground">Cards</div></div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-display text-lg font-bold">Bio</h3>
            <p className="mt-2 text-muted-foreground">Penggemar Nailong sejak hari pertama. Kolektor ekspresi marah Nailong. Tim Nailong forever! 💛🐲</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Koleksi Terbaru</h3>
              <Button asChild variant="ghost" size="sm"><Link to="/my-collection">Lihat semua →</Link></Button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {owned.map((c) => (
                <div key={c.id} className="overflow-hidden rounded-2xl border">
                  <img src={c.img} alt="" className="aspect-square w-full object-cover" />
                  <div className="p-2 text-center text-xs font-semibold">{c.rarity}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
