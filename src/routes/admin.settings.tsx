import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-bold">Pengaturan Situs</h1>
      <form className="grid gap-4 lg:grid-cols-2" onSubmit={(e) => { e.preventDefault(); toast.success("Pengaturan disimpan!"); }}>
        <Card className="space-y-4 p-6">
          <h2 className="font-display text-lg font-bold">Umum</h2>
          <div><Label>Nama Situs</Label><Input defaultValue="Nailong Fan Hub" /></div>
          <div><Label>Tagline</Label><Input defaultValue="Komunitas naga kuning paling lucu" /></div>
          <div><Label>Deskripsi</Label><Textarea defaultValue="Situs penggemar Nailong terlengkap." rows={3} /></div>
        </Card>
        <Card className="space-y-4 p-6">
          <h2 className="font-display text-lg font-bold">Fitur</h2>
          {[
            { l: "Aktifkan registrasi user baru", d: true },
            { l: "Aktifkan upload meme publik", d: true },
            { l: "Tampilkan sticker pack premium", d: false },
            { l: "Buka voting Nailong vs Bomboong", d: true },
            { l: "Mode maintenance", d: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0">
              <Label>{s.l}</Label><Switch defaultChecked={s.d} />
            </div>
          ))}
        </Card>
        <div className="lg:col-span-2"><Button type="submit" className="rounded-full">Simpan Pengaturan</Button></div>
      </form>
    </div>
  );
}
