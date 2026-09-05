import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import { useCreateAdminItem, useAdminCategories } from "@/lib/queries";

export const Route = createFileRoute("/admin/content/gallery/new")({
  component: NewGalleryItem,
});

function NewGalleryItem() {
  const navigate = useNavigate();
  const { data: categories } = useAdminCategories();
  const galleryCategories = categories?.filter((c: any) => c.type === "gallery");

  const createGal = useCreateAdminItem("gallery", "gallery");
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    category: galleryCategories?.[0]?.name || "Official",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `gal-${Math.random().toString(36).substr(2, 5)}`;
    createGal.mutate({ ...formData, id }, {
      onSuccess: () => {
        toast.success("Item galeri berhasil ditambahkan!");
        navigate({ to: "/admin/content" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/content"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Tambah Galeri Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Judul Gambar</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Wallpaper Nailong HD" />
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
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Pilih Kategori...</option>
                  {galleryCategories?.map((c: any) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>URL Gambar</Label>
                <Input required value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} placeholder="https://..." />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={createGal.isPending}>
            {createGal.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan ke Galeri
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/content">Batal</Link>
          </Button>
        </div>

        <div>
          <Card className="p-6 h-full flex flex-col">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Preview Gambar
            </h2>
            <div className="flex-1 overflow-hidden rounded-xl bg-muted border border-border flex items-center justify-center">
              {formData.img ? (
                <img src={formData.img} alt="Preview" className="h-full w-full object-contain" />
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="mt-2 text-sm text-muted-foreground">Preview Gambar</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
