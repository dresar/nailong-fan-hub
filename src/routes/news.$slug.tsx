import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { news } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/news/$slug")({
  component: NewsDetail,
});

function NewsDetail() {
  const { slug } = Route.useParams();
  const article = news.find((n) => n.slug === slug);
  if (!article) throw notFound();

  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/news"><ArrowLeft className="mr-2 h-4 w-4" />Kembali</Link></Button>
        <div className="text-xs text-primary">{article.date}</div>
        <h1 className="mt-2 font-display text-4xl font-bold">{article.title}</h1>
        <img src={article.cover} alt={article.title} className="mt-6 w-full rounded-3xl" loading="lazy" />
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p className="text-lg">{article.excerpt}</p>
          <p>{article.body}</p>
          <p>{article.body}</p>
        </div>
      </article>
    </PublicLayout>
  );
}
