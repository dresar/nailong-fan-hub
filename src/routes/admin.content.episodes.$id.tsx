import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, Play, Film, Clock, Eye, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import { useAdminEpisodes, useUpdateAdminItem, useAdminCategories } from "@/lib/queries";

export const Route = createFileRoute("/admin/content/episodes/$id")({
  component: EditEpisode,
});

function EditEpisode() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: episodes, isLoading: isFetching } = useAdminEpisodes();
  const { data: categories } = useAdminCategories();
  const epCategories = categories?.filter((c: any) => c.type === "episodes");
  
  const updateEp = useUpdateAdminItem("episodes", "episodes");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    season: 1,
    duration: "",
    views: "",
    thumb: "",
    desc: "",
    category: "",
  });

  useEffect(() => {
    if (episodes) {
      const ep = episodes.find((e: any) => e.id === id);
      if (ep) setFormData(ep);
    }
  }, [episodes, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEp.mutate({ id, data: formData }, {
      onSuccess: () => {
        toast.success("Episode berhasil diperbarui!");
        navigate({ to: "/admin/content" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  if (isFetching) return <div className="flex justify-center p-24"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/content"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Edit Episode</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Judul Episode</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
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
                  <Input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Eye className="h-3 w-3" /> Views</Label>
                  <Input value={formData.views} onChange={e => setFormData({...formData, views: e.target.value})} />
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
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <Film className="h-4 w-4" /> Thumbnail
            </h2>
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border flex items-center justify-center relative">
                <img src={formData.thumb || "https://placehold.co/800?text=No+Thumb"} alt="Preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>URL Thumbnail</Label>
                <Input required value={formData.thumb} onChange={e => setFormData({...formData, thumb: e.target.value})} />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={updateEp.isPending}>
            {updateEp.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Perubahan
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/content">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
