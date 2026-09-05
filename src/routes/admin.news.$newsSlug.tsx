import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, Newspaper, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useAdminNews, useUpdateAdminItem, useAdminCategories } from "@/lib/queries";
import { LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/admin/news/$newsSlug")({
  component: EditNews,
});

function EditNews() {
  const { newsSlug } = Route.useParams();
  const navigate = useNavigate();
  const { data: newsItems, isLoading: isFetching } = useAdminNews();
  const { data: categories } = useAdminCategories();
  const newsCategories = categories?.filter((c: any) => c.type === "news");

  const updateNews = useUpdateAdminItem("news", "news");
  
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    date: "",
    excerpt: "",
    cover: "",
    body: "",
    category: "",
  });

  useEffect(() => {
    if (newsItems) {
      const item = newsItems.find((n: any) => n.slug === newsSlug);
      if (item) setFormData(item);
    }
  }, [newsItems, newsSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNews.mutate({ id: newsSlug, data: formData }, {
      onSuccess: () => {
        toast.success("Berita diperbarui!");
        navigate({ to: "/admin/news" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  if (isFetching) return <div className="flex justify-center p-24"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/news"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Edit Berita</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Judul Berita</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL) - Tidak dapat diubah</Label>
                <Input disabled value={formData.slug} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  Pilih Kategori
                  <Link to="/admin/categories" className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                    <LayoutGrid className="h-3 w-3" /> Kelola
                  </Link>
                </Label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={(formData as any).category}
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
                <Textarea value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
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
                <img src={formData.cover || "https://placehold.co/800?text=No+Image"} alt="Preview" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-2">
                <Label>URL Cover Image</Label>
                <Input required value={formData.cover} onChange={e => setFormData({...formData, cover: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Tanggal Terbit</Label>
                <Input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={updateNews.isPending}>
            {updateNews.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Perubahan
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/news">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
