import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Tag, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCreateAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/content/memes/new")({
  component: NewMeme,
});

function NewMeme() {
  const navigate = useNavigate();
  const createMeme = useCreateAdminItem("memes", "memes");
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    tag: "reaction",
    likes: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `meme-${Math.random().toString(36).substr(2, 5)}`;
    createMeme.mutate({ ...formData, id }, {
      onSuccess: () => {
        toast.success("Meme berhasil ditambahkan!");
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
        <h1 className="font-display text-3xl font-bold">Tambah Meme Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Judul Meme</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Nailong Marah" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Tag className="h-3 w-3" /> Tag</Label>
                  <Input required value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} placeholder="reaction, funny, cute" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Heart className="h-3 w-3" /> Likes Awal</Label>
                  <Input type="number" value={formData.likes} onChange={e => setFormData({...formData, likes: Number(e.target.value)})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>URL Gambar Meme</Label>
                <Input required value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} placeholder="https://..." />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={createMeme.isPending}>
            {createMeme.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Meme
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/content">Batal</Link>
          </Button>
        </div>

        <div>
          <Card className="p-6 h-full flex flex-col">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Preview Meme
            </h2>
            <div className="flex-1 aspect-square w-full overflow-hidden rounded-xl bg-muted border border-border flex items-center justify-center">
              {formData.img ? (
                <img src={formData.img} alt="Preview" className="h-full w-full object-cover" />
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
