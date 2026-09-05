import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { news } from "@/data/mock";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "Berita — Nailong Fan Hub" }, { name: "description", content: "Update terbaru dari semesta Nailong." }] }),
  component: News,
});

function News() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="News" title="Berita & Update 📰" subtitle="Berita terbaru dari semesta Nailong." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => (
          <Link key={n.slug} to="/news/$slug" params={{ slug: n.slug }}>
            <Card className="overflow-hidden p-0 h-full transition hover:nailong-glow">
              <img src={n.cover} alt={n.title} className="h-44 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <div className="text-xs text-primary">{n.date}</div>
                <div className="mt-1 font-display text-lg font-bold leading-snug">{n.title}</div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PublicLayout>
  );
}
