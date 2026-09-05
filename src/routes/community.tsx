import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/mock";
import { Heart, MessageCircle, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Komunitas — Nailong Fan Hub" }] }),
  component: Community,
});

function Community() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="Forum" title="Komunitas Fans 👥" subtitle="Bagikan momen, fanart, dan diskusi dengan sesama fans." />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="mb-6 flex justify-end">
          <Button onClick={() => toast.success("Post baru dibuat!")} className="rounded-full"><Plus className="mr-2 h-4 w-4" /> Post Baru</Button>
        </div>
        <div className="space-y-4">
          {posts.map((p) => (
            <Card key={p.id} className="p-5">
              <div className="flex items-center gap-3">
                <img src={p.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{p.author}</div>
                  <div className="text-xs text-muted-foreground">{p.time}</div>
                </div>
              </div>
              <Link to="/community/$postId" params={{ postId: p.id }}>
                <h3 className="mt-3 font-display text-lg font-bold hover:text-primary">{p.title}</h3>
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
              <img src={p.cover} alt="" className="mt-3 max-h-72 w-full rounded-2xl object-cover" loading="lazy" />
              <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="h-4 w-4" /> {p.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" /> {p.comments}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
