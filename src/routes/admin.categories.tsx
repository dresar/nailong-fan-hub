import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus, Loader2, LayoutGrid, ShoppingBag, Image as ImageIcon, Newspaper, Film } from "lucide-react";
import { toast } from "sonner";
import { useAdminCategories, useDeleteAdminItem, useCreateAdminItem, useUpdateAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const { data: categories, isLoading } = useAdminCategories();
  const createCat = useCreateAdminItem("categories", "categories");
  const updateCat = useUpdateAdminItem("categories", "categories");
  const deleteCat = useDeleteAdminItem("categories", "categories");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", type: "product", icon: "" });

  const types = [
    { id: "product", label: "Produk Toko", icon: ShoppingBag },
    { id: "gallery", label: "Galeri", icon: ImageIcon },
    { id: "news", label: "Berita", icon: Newspaper },
    { id: "episodes", label: "Episode", icon: Film },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCat.mutate({ id: editingId, data: formData }, {
        onSuccess: () => {
          toast.success("Kategori diperbarui");
          setEditingId(null);
          setFormData({ name: "", type: formData.type, icon: "" });
        }
      });
    } else {
      const id = `${formData.type}-${formData.name.toLowerCase().replace(/ /g, "-")}`;
      createCat.mutate({ ...formData, id }, {
        onSuccess: () => {
          toast.success("Kategori ditambahkan");
          setFormData({ name: "", type: formData.type, icon: "" });
        }
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus kategori ini?")) {
      deleteCat.mutate(id, { onSuccess: () => toast.success("Kategori dihapus") });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Manajemen Kategori</h1>
        <p className="text-muted-foreground">Kelola semua kategori dinamis untuk website.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form Card */}
        <Card className="p-6 h-fit sticky top-6">
          <h2 className="mb-4 font-bold flex items-center gap-2">
            {editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {editingId ? "Edit Kategori" : "Tambah Kategori"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipe Kategori</Label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                {types.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Nama Kategori</Label>
              <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Contoh: Boneka" />
            </div>
            <div className="space-y-2">
              <Label>Icon (Lucide Name)</Label>
              <Input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="Contoh: Tag" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1 rounded-full nailong-glow" disabled={createCat.isPending || updateCat.isPending}>
                {(createCat.isPending || updateCat.isPending) ? <Loader2 className="animate-spin" /> : editingId ? "Perbarui" : "Simpan"}
              </Button>
              {editingId && (
                <Button type="button" variant="ghost" className="rounded-full" onClick={() => { setEditingId(null); setFormData({ name: "", type: "product", icon: "" }); }}>
                  Batal
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* List Card */}
        <Card className="lg:col-span-2 p-6">
          <Tabs defaultValue="product">
            <TabsList className="mb-4">
              {types.map(t => (
                <TabsTrigger key={t.id} value={t.id} className="flex items-center gap-2">
                  <t.icon className="h-3 w-3" /> {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {types.map(t => (
              <TabsContent key={t.id} value={t.id} className="space-y-3">
                {isLoading ? (
                  <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {categories?.filter((c: any) => c.type === t.id).map((c: any) => (
                      <div key={c.id} className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/50 p-4 transition-all hover:border-primary/40 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <LayoutGrid className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-bold">{c.name}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">ID: {c.id}</div>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => { setEditingId(c.id); setFormData(c); }}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10" onClick={() => handleDelete(c.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!isLoading && categories?.filter((c: any) => c.type === t.id).length === 0 && (
                  <div className="text-center p-12 text-muted-foreground italic border border-dashed rounded-xl">
                    Belum ada kategori untuk {t.label}.
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
