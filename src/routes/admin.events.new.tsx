import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, MapPin, Calendar as CalendarIcon, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useCreateAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/events/new")({
  component: NewEvent,
});

function NewEvent() {
  const navigate = useNavigate();
  const createEvent = useCreateAdminItem("events", "events");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    cover: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    createEvent.mutate({ ...formData, id }, {
      onSuccess: () => {
        toast.success("Event berhasil dibuat!");
        navigate({ to: "/admin/events" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/events"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Buat Event Fanbase Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Judul Event</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Gathering Nasional Nailong" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tanggal & Waktu</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input required className="pl-10" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="15 Juli 2026" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Lokasi</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input required className="pl-10" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Jakarta, Indonesia" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Label className="mb-2 block">Deskripsi Lengkap Event</Label>
            <Textarea 
              required 
              className="h-48" 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              placeholder="Tuliskan detail acara, agenda, dan informasi penting lainnya..."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Cover Event
            </h2>
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border">
                {formData.cover ? (
                  <img src={formData.cover} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground opacity-20">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>URL Gambar</Label>
                <Input required value={formData.cover} onChange={e => setFormData({...formData, cover: e.target.value})} placeholder="https://..." />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={createEvent.isPending}>
            {createEvent.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Publikasikan Event
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/events">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
