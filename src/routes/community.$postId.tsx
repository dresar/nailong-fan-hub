import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/mock";
import { ArrowLeft, Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/community/$postId")({
  component: PostDetail,
});

function PostDetail() {
  const { postId } = Route.useParams();
  const p = posts.find((x) => x.id === postId);
  if (!p) throw notFound();
  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Button asChild variant="ghost" size="sm"><Link to="/community"><ArrowLeft className="mr-2 h-4 w-4" />Forum</Link></Button>
        <Card className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <img src={p.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div><div className="font-semibold">{p.author}</div><div className="text-xs text-muted-foreground">{p.time}</div></div>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold">{p.title}</h1>
          <p className="mt-3 text-muted-foreground">{p.body}</p>
          <img src={p.cover} alt="" className="mt-4 w-full rounded-2xl" />
          <div className="mt-4 flex gap-2"><Button size="sm" variant="outline" className="rounded-full"><Heart className="mr-1 h-4 w-4" />{p.likes}</Button></div>
        </Card>
        <h2 className="mt-8 mb-3 font-display text-xl font-bold">Komentar ({p.comments})</h2>
        <div className="space-y-3">
          {[1,2,3].map((i) => (
            <Card key={i} className="flex gap-3 p-3">
              <Avatar><AvatarFallback>F{i}</AvatarFallback></Avatar>
              <div><div className="text-sm font-semibold">Fan{i}</div><div className="text-sm text-muted-foreground">Nailong best dragon ever! 💛</div></div>
            </Card>
          ))}
        </div>
      </article>
    </PublicLayout>
  );
}
