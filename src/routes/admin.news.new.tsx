import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, Newspaper, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useCreateAdminItem, useAdminCategories } from "@/lib/queries";
import { LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/admin/news/new")({
  component: NewNews,
});

function NewNews() {
  const navigate = useNavigate();
  const { data: categories } = useAdminCategories();
  const newsCategories = categories?.filter((c: any) => c.type === "news");

  const createNews = useCreateAdminItem("news", "news");
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    date: new Date().toLocaleDateString("id-ID"),
    excerpt: "",
    cover: "",
    body: "",
    category: newsCategories?.[0]?.name || "Update",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    createNews.mutate({ ...formData, slug }, {
      onSuccess: () => {
        toast.success("Berita berhasil dipublikasikan!");
        navigate({ to: "/admin/news" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/news"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Tulis Berita Terbaru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Judul Berita</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Nailong x McDonald's Collaboration" />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="nailong-mcd-collab" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  Pilih Kategori Berita
                  <Link to="/admin/categories" className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                    <LayoutGrid className="h-3 w-3" /> Kelola
                  </Link>
                </Label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Pilih Kategori...</option>
                  {newsCategories?.map((c: any) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Ringkasan Singkat (Excerpt)</Label>
                <Textarea value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} placeholder="Tuliskan 1-2 kalimat pengantar..." />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Label className="mb-2 block font-semibold">Isi Berita Lengkap</Label>
            <Textarea 
              required 
              className="h-96 font-serif" 
              value={formData.body} 
              onChange={e => setFormData({...formData, body: e.target.value})} 
              placeholder="Gunakan Markdown atau teks biasa..."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Media Berita
            </h2>
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border">
                {formData.cover ? (
                  <img src={formData.cover} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground opacity-20">
                    <Newspaper className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>URL Cover Image</Label>
                <Input required value={formData.cover} onChange={e => setFormData({...formData, cover: e.target.value})} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Tanggal Terbit</Label>
                <Input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={createNews.isPending}>
            {createNews.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Publikasikan Berita
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/news">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
