import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Kontak — Nailong Fan Hub" }] }),
  component: Contact,
});

function Contact() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="Hubungi" title="Sapa Tim Fan Hub 💌" subtitle="Punya pertanyaan, kritik, atau mau kolaborasi? Kirim pesan." />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 md:grid-cols-3">
        <div className="space-y-4 md:col-span-1">
          {[
            { icon: Mail, t: "Email", v: "halo@nailongfan.id" },
            { icon: MessageCircle, t: "Discord", v: "discord.gg/nailong" },
            { icon: MapPin, t: "Lokasi", v: "Jakarta, Indonesia" },
          ].map((c) => (
            <Card key={c.t} className="flex items-center gap-3 p-4">
              <c.icon className="h-5 w-5 text-primary" />
              <div><div className="text-xs text-muted-foreground">{c.t}</div><div className="font-semibold">{c.v}</div></div>
            </Card>
          ))}
        </div>
        <Card className="p-6 md:col-span-2">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Pesanmu sudah meluncur ke sarang Nailong! 🐲"); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Nama</Label><Input required placeholder="Nama kamu" /></div>
              <div><Label>Email</Label><Input required type="email" placeholder="email@kamu.com" /></div>
            </div>
            <div><Label>Subjek</Label><Input required placeholder="Mau ngobrol soal..." /></div>
            <div><Label>Pesan</Label><Textarea required rows={6} placeholder="Tulis pesanmu di sini..." /></div>
            <Button type="submit" className="rounded-full">Kirim Pesan</Button>
          </form>
        </Card>
      </div>
    </PublicLayout>
  );
}
