import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { useCharacters } from "@/lib/queries";

export const Route = createFileRoute("/characters")({
  head: () => ({ meta: [{ title: "Karakter — Nailong Fan Hub" }, { name: "description", content: "Semua karakter di semesta Nailong." }] }),
  component: Characters,
});

function Characters() {
  const { data: characters = [] } = useCharacters();
  return (
    <PublicLayout>
      <PageHeader eyebrow="Cast" title="Semua Karakter" subtitle="Kenali Nailong dan teman-teman dari semesta naga susu." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {characters.map((c) => (
          <Card key={c.id} className="overflow-hidden p-0 transition hover:nailong-glow">
            <img src={c.img} alt={c.name} className="h-64 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <div className="font-display text-xl font-bold">{c.name}</div>
              <div className="text-xs font-semibold text-primary">{c.role}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </PublicLayout>
  );
}
