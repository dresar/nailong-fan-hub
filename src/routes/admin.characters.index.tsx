import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, UserCircle } from "lucide-react";
import { useCharacters, useDeleteAdminItem } from "@/lib/queries";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/characters/")({
  component: AdminCharacters,
});

function AdminCharacters() {
  const { data: characters, isLoading } = useCharacters();
  const deleteChar = useDeleteAdminItem("characters", "characters");

  const handleDelete = (id: string) => {
    if (confirm("Hapus profil karakter ini?")) {
      deleteChar.mutate(id, {
        onSuccess: () => toast.success("Karakter dihapus"),
        onError: (err: any) => toast.error(err.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Profil Karakter</h1>
          <p className="text-muted-foreground">Kelola profil dan gambar karakter (Tentang Nailong).</p>
        </div>
        <Button className="rounded-full nailong-glow" asChild>
          <Link to="/admin/characters/new"><Plus className="mr-2 h-4 w-4" /> Tambah Karakter</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-24"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {characters?.map((c: any) => (
            <Card key={c.id} className="group overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md" asChild>
                    <Link to="/admin/characters/$charId" params={{ charId: c.id }}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-md" onClick={() => handleDelete(c.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs font-bold text-primary uppercase tracking-widest">{c.role}</div>
                <h3 className="text-xl font-bold">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.desc}</p>
              </div>
            </Card>
          ))}
          {!isLoading && characters?.length === 0 && (
            <div className="col-span-full py-24 text-center border-2 border-dashed rounded-3xl">
              <UserCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <p className="mt-4 text-muted-foreground">Belum ada profil karakter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
