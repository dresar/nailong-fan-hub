import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, MapPin, Calendar as CalendarIcon, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useAdminEvents, useUpdateAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/events/$eventId")({
  component: EditEvent,
});

function EditEvent() {
  const { eventId } = Route.useParams();
  const navigate = useNavigate();
  const { data: events, isLoading: isFetching } = useAdminEvents();
  const updateEvent = useUpdateAdminItem("events", "events");
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    date: "",
    location: "",
    cover: "",
    description: "",
  });

  useEffect(() => {
    if (events) {
      const event = events.find((e: any) => e.id === eventId);
      if (event) setFormData(event);
    }
  }, [events, eventId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent.mutate({ id: eventId, data: formData }, {
      onSuccess: () => {
        toast.success("Event diperbarui!");
        navigate({ to: "/admin/events" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  if (isFetching) return <div className="flex justify-center p-24"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/events"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Edit Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Judul Event</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tanggal & Waktu</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input required className="pl-10" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Lokasi</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input required className="pl-10" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
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
                <img src={formData.cover || "https://placehold.co/800?text=No+Cover"} alt="Preview" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-2">
                <Label>URL Gambar</Label>
                <Input required value={formData.cover} onChange={e => setFormData({...formData, cover: e.target.value})} />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={updateEvent.isPending}>
            {updateEvent.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Perbarui Event
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/events">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
