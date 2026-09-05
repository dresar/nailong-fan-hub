import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useCharacters, useUpdateAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/characters/$charId")({
  component: EditCharacter,
});

function EditCharacter() {
  const { charId } = Route.useParams();
  const navigate = useNavigate();
  const { data: characters, isLoading: isFetching } = useCharacters();
  const updateChar = useUpdateAdminItem("characters", "characters");
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    desc: "",
    img: "",
  });

  useEffect(() => {
    if (characters) {
      const char = characters.find((c: any) => c.id === charId);
      if (char) setFormData(char);
    }
  }, [characters, charId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateChar.mutate({ id: charId, data: formData }, {
      onSuccess: () => {
        toast.success("Profil karakter diperbarui!");
        navigate({ to: "/admin/characters" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  if (isFetching) return <div className="flex justify-center p-24"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/characters"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Edit Profil Karakter</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Nama Karakter</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Role / Peran</Label>
                <Input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>ID (Tidak dapat diubah)</Label>
                <Input disabled value={formData.id} />
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
                <img src={formData.img || "https://placehold.co/800"} alt="Preview" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-2">
                <Label>URL Gambar</Label>
                <Input required value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={updateChar.isPending}>
            {updateChar.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Perubahan
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/characters">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
