import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Pencil, Trash2, Plus, Loader2, MapPin, Calendar as CalendarIcon, 
  Info, Search
} from "lucide-react";
import { toast } from "sonner";
import { useAdminEvents, useDeleteAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/events/")({
  component: AdminEvents,
});

function AdminEvents() {
  const [search, setSearch] = useState("");
  const { data: events, isLoading } = useAdminEvents();
  const deleteEvent = useDeleteAdminItem("events", "events");

  const filteredEvents = events?.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Hapus event ini secara permanen?")) {
      deleteEvent.mutate(id, {
        onSuccess: () => toast.success("Event berhasil dihapus"),
        onError: (err: any) => toast.error(err.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Acara & Event</h1>
          <p className="text-muted-foreground">Kelola jadwal pertemuan fanbase Nailong.</p>
        </div>
        
        <Button className="rounded-full nailong-glow px-6" asChild>
          <Link to="/admin/events/new"><Plus className="mr-2 h-4 w-4" /> Tambah Event Baru</Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-card/50 px-4 py-2 border border-border/40 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari event atau lokasi..." 
          className="bg-transparent text-sm outline-none w-full"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-24"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents?.map((e: any) => (
            <Card key={e.id} className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img src={e.cover} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md" asChild>
                    <Link to="/admin/events/$eventId" params={{ eventId: e.id }}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-md" onClick={() => handleDelete(e.id)} disabled={deleteEvent.isPending}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold line-clamp-1">{e.title}</h3>
                
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 text-primary" />
                    {e.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" />
                    {e.location}
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-muted-foreground line-clamp-2">
                  {e.description || "Tidak ada deskripsi."}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">ID: {e.id}</div>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Info className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
