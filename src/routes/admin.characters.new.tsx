import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useCreateAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/characters/new")({
  component: NewCharacter,
});

function NewCharacter() {
  const navigate = useNavigate();
  const createChar = useCreateAdminItem("characters", "characters");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "Karakter Utama",
    desc: "",
    img: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = formData.id || formData.name.toLowerCase().replace(/ /g, "-");
    createChar.mutate({ ...formData, id }, {
      onSuccess: () => {
        toast.success("Profil karakter berhasil ditambahkan!");
        navigate({ to: "/admin/characters" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/characters"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Tambah Karakter Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Nama Karakter</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Contoh: Nailong" />
              </div>
              <div className="space-y-2">
                <Label>Role / Peran</Label>
                <Input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="Contoh: Sang Naga Gembul" />
              </div>
              <div className="space-y-2">
                <Label>ID Unik (Opsional)</Label>
                <Input value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} placeholder="nailong-main" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Label className="mb-2 block">Deskripsi Lengkap</Label>
            <Textarea 
              required 
              className="h-48" 
              value={formData.desc} 
              onChange={e => setFormData({...formData, desc: e.target.value})} 
              placeholder="Ceritakan tentang karakter ini..."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Foto Karakter
            </h2>
            <div className="space-y-4">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted border border-border flex items-center justify-center">
                {formData.img ? (
                  <img src={formData.img} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground opacity-20" />
                    <p className="mt-2 text-xs text-muted-foreground">Preview Foto</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>URL Gambar</Label>
                <Input required value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} placeholder="https://..." />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={createChar.isPending}>
            {createChar.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Profil
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/characters">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
