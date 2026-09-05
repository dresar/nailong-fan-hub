import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, Play, Film, Clock, Eye } from "lucide-react";
import { toast } from "sonner";
import { useCreateAdminItem, useAdminCategories } from "@/lib/queries";
import { LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/admin/content/episodes/new")({
  component: NewEpisode,
});

function NewEpisode() {
  const navigate = useNavigate();
  const { data: categories } = useAdminCategories();
  const epCategories = categories?.filter((c: any) => c.type === "episodes");

  const createEp = useCreateAdminItem("episodes", "episodes");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    season: 1,
    duration: "02:30",
    views: "0",
    thumb: "",
    desc: "",
    category: epCategories?.[0]?.name || "Official",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = formData.id || `ep-${Math.random().toString(36).substr(2, 5)}`;
    createEp.mutate({ ...formData, id }, {
      onSuccess: () => {
        toast.success("Episode berhasil ditambahkan!");
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
        <h1 className="font-display text-3xl font-bold">Tambah Episode Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>ID Episode</Label>
                <Input value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} placeholder="Contoh: ep-101 (Biarkan kosong untuk auto-generate)" />
              </div>
              <div className="space-y-2">
                <Label>Judul Episode</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Nailong Masak Besar" />
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
                  {epCategories?.map((c: any) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Season</Label>
                  <Input required type="number" value={formData.season} onChange={e => setFormData({...formData, season: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Clock className="h-3 w-3" /> Durasi</Label>
                  <Input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="02:45" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Eye className="h-3 w-3" /> Views Awal</Label>
                  <Input value={formData.views} onChange={e => setFormData({...formData, views: e.target.value})} placeholder="1.2M" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Label className="mb-2 block">Sinopsis / Deskripsi</Label>
            <Textarea 
              required 
              className="h-32" 
              value={formData.desc} 
              onChange={e => setFormData({...formData, desc: e.target.value})} 
              placeholder="Ceritakan sedikit tentang episode ini..."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <Film className="h-4 w-4" /> Thumbnail Episode
            </h2>
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border flex items-center justify-center relative">
                {formData.thumb ? (
                  <>
                    <img src={formData.thumb} alt="Preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Film className="mx-auto h-8 w-8 text-muted-foreground opacity-20" />
                    <p className="mt-2 text-xs text-muted-foreground">Preview Thumbnail</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>URL Thumbnail</Label>
                <Input required value={formData.thumb} onChange={e => setFormData({...formData, thumb: e.target.value})} placeholder="https://..." />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={createEp.isPending}>
            {createEp.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Episode
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/content">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
