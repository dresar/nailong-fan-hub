import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { events } from "@/data/mock";
import { Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Event — Nailong Fan Hub" }] }),
  component: Events,
});

function Events() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="Event" title="Event & Meetup 🎉" subtitle="Kumpulan acara seru komunitas Nailong." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => (
          <Card key={ev.id} className="overflow-hidden p-0">
            <img src={ev.cover} alt={ev.title} className="h-44 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <div className="font-display text-lg font-bold">{ev.title}</div>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{ev.date}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{ev.location}</div>
              </div>
              <Button onClick={() => toast.success(`RSVP untuk ${ev.title}!`)} className="mt-4 w-full rounded-full">Daftar</Button>
            </div>
          </Card>
        ))}
      </div>
    </PublicLayout>
  );
}
