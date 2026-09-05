import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Loader2, Calendar as CalendarIcon, Search } from "lucide-react";
import { toast } from "sonner";
import { useAdminNews, useDeleteAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/news/")({
  component: AdminNews,
});

function AdminNews() {
  const [search, setSearch] = useState("");
  const { data: news, isLoading } = useAdminNews();
  const deleteNews = useDeleteAdminItem("news", "news");

  const filteredNews = news?.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (slug: string) => {
    if (confirm("Hapus berita ini secara permanen?")) {
      deleteNews.mutate(slug, {
        onSuccess: () => toast.success("Berita berhasil dihapus"),
        onError: (err: any) => toast.error(err.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Berita & Update</h1>
          <p className="text-muted-foreground">Kelola pengumuman dan berita terbaru untuk fans.</p>
        </div>
        
        <Button className="rounded-full nailong-glow px-6" asChild>
          <Link to="/admin/news/new"><Plus className="mr-2 h-4 w-4" /> Tulis Berita Baru</Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-card/50 px-4 py-2 border border-border/40 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari berita..." 
          className="bg-transparent text-sm outline-none w-full"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-24"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews?.map((n: any) => (
            <Card key={n.slug} className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img src={n.cover} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md" asChild>
                    <Link to="/admin/news/$newsSlug" params={{ newsSlug: n.slug }}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-md" onClick={() => handleDelete(n.slug)} disabled={deleteNews.isPending}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                  <CalendarIcon className="h-3 w-3" /> {n.date}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold line-clamp-2">{n.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {n.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="text-[10px] text-muted-foreground italic">Slug: {n.slug}</span>
                  <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
