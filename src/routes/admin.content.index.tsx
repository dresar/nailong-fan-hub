import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useAdminEpisodes, useAdminMemes, useAdminGallery, useDeleteAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/content/")({
  component: AdminContent,
});

function AdminContent() {
  const { data: episodes, isLoading: loadingEp } = useAdminEpisodes();
  const { data: memes, isLoading: loadingMemes } = useAdminMemes();
  const { data: gallery, isLoading: loadingGallery } = useAdminGallery();

  const deleteEp = useDeleteAdminItem("episodes", "episodes");
  const deleteMeme = useDeleteAdminItem("memes", "memes");
  const deleteGal = useDeleteAdminItem("gallery", "gallery");

  const handleDelete = (id: string, mutation: any) => {
    if (confirm("Yakin ingin menghapus item ini secara permanen?")) {
      mutation.mutate(id, {
        onSuccess: () => toast.success("Berhasil dihapus"),
        onError: (err: any) => toast.error(err.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Manajemen Konten</h1>
          <p className="text-muted-foreground">Kelola episode, meme, dan koleksi galeri.</p>
        </div>
      </div>
      
      <Tabs defaultValue="ep" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="ep" className="rounded-md px-6">Episode</TabsTrigger>
            <TabsTrigger value="mm" className="rounded-md px-6">Memes</TabsTrigger>
            <TabsTrigger value="gl" className="rounded-md px-6">Galeri</TabsTrigger>
          </TabsList>

          <TabsContent value="ep" className="m-0">
             <Button className="rounded-full nailong-glow" asChild>
               <Link to="/admin/content/episodes/new"><Plus className="mr-2 h-4 w-4" /> Tambah Episode</Link>
             </Button>
          </TabsContent>
          <TabsContent value="mm" className="m-0">
             <Button className="rounded-full nailong-glow" asChild>
               <Link to="/admin/content/memes/new"><Plus className="mr-2 h-4 w-4" /> Tambah Meme</Link>
             </Button>
          </TabsContent>
          <TabsContent value="gl" className="m-0">
             <Button className="rounded-full nailong-glow" asChild>
               <Link to="/admin/content/gallery/new"><Plus className="mr-2 h-4 w-4" /> Tambah Galeri</Link>
             </Button>
          </TabsContent>
        </div>

        <TabsContent value="ep">
          {loadingEp ? (
            <div className="flex justify-center p-24"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {episodes?.map((e: any) => (
                <Card key={e.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img src={e.thumb} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md" asChild>
                        <Link to="/admin/content/episodes/$id" params={{ id: e.id }}><Pencil className="h-4 w-4" /></Link>
                      </Button>
                      <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-md" onClick={() => handleDelete(e.id, deleteEp)} disabled={deleteEp.isPending}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                      {e.duration}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
                      Season {e.season} • {e.views} Views
                    </div>
                    <h3 className="mt-1 font-bold line-clamp-1">{e.title}</h3>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="mm">
          {loadingMemes ? (
            <div className="flex justify-center p-24"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {memes?.map((m: any) => (
                <div key={m.id} className="group relative overflow-hidden rounded-xl bg-muted shadow-sm border border-border/40">
                  <img src={m.img} alt={m.title} className="aspect-square w-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md" asChild>
                      <Link to="/admin/content/memes/$id" params={{ id: m.id }}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-md" onClick={() => handleDelete(m.id, deleteMeme)} disabled={deleteMeme.isPending}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-2 text-center text-[10px] font-medium truncate">{m.title}</div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="gl">
          {loadingGallery ? (
            <div className="flex justify-center p-24"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {gallery?.map((g: any) => (
                <div key={g.id} className="group relative overflow-hidden rounded-xl bg-muted shadow-sm border border-border/40">
                  <img src={g.img} alt={g.title} className="aspect-square w-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md" asChild>
                      <Link to="/admin/content/gallery/$id" params={{ id: g.id }}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-md" onClick={() => handleDelete(g.id, deleteGal)} disabled={deleteGal.isPending}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-2 text-center text-[10px] font-medium truncate">{g.title}</div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
