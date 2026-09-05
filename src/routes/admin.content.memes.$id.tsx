import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Tag, Heart, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import { useAdminMemes, useUpdateAdminItem, useAdminCategories } from "@/lib/queries";

export const Route = createFileRoute("/admin/content/memes/$id")({
  component: EditMeme,
});

function EditMeme() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: memes, isLoading: isFetching } = useAdminMemes();
  const { data: categories } = useAdminCategories();
  const memeCategories = categories?.filter((c: any) => c.type === "memes");

  const updateMeme = useUpdateAdminItem("memes", "memes");
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    tag: "",
    likes: 0,
  });

  useEffect(() => {
    if (memes) {
      const item = memes.find((m: any) => m.id === id);
      if (item) setFormData(item);
    }
  }, [memes, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMeme.mutate({ id, data: formData }, {
      onSuccess: () => {
        toast.success("Meme berhasil diperbarui!");
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
        <h1 className="font-display text-3xl font-bold">Edit Meme</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Judul Meme</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  Tag / Kategori
                  <Link to="/admin/categories" className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                    <LayoutGrid className="h-3 w-3" /> Kelola
                  </Link>
                </Label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.tag}
                  onChange={e => setFormData({...formData, tag: e.target.value})}
                >
                  <option value="">Pilih Tag...</option>
                  {memeCategories?.map((c: any) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1"><Heart className="h-3 w-3" /> Likes</Label>
                <Input type="number" value={formData.likes} onChange={e => setFormData({...formData, likes: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <Label>URL Gambar Meme</Label>
                <Input required value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={updateMeme.isPending}>
            {updateMeme.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Perubahan
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/content">Batal</Link>
          </Button>
        </div>

        <div>
          <Card className="p-6 h-full flex flex-col">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Preview
            </h2>
            <div className="flex-1 aspect-square w-full overflow-hidden rounded-xl bg-muted border border-border flex items-center justify-center">
              <img src={formData.img || "https://placehold.co/800"} alt="Preview" className="h-full w-full object-cover" />
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
