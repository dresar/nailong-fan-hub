import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { useEpisodes } from "@/lib/queries";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/watch/$episodeId")({
  component: WatchEpisode,
});

function WatchEpisode() {
  const { episodeId } = Route.useParams();
  const { data: episodes = [] } = useEpisodes();
  const ep = episodes.find((e) => e.id === episodeId);
  
  if (!ep) return <div className="p-8 text-center">Loading or Episode Not Found...</div>;
  
  const others = episodes.filter((e) => e.id !== episodeId).slice(0, 4);

  return (
    <PublicLayout>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="relative overflow-hidden rounded-3xl bg-black">
            <img src={ep.thumb} alt={ep.title} className="aspect-video w-full object-cover opacity-80" />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-primary p-6 nailong-glow"><Play className="h-10 w-10 fill-primary-foreground text-primary-foreground" /></div>
            </button>
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">{ep.title}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{ep.views} views</span><span>•</span><span>Season {ep.season}</span>
            <div className="ml-auto flex gap-2">
              <Button size="sm" variant="outline" className="rounded-full"><Heart className="mr-1 h-4 w-4" /> Like</Button>
              <Button size="sm" variant="outline" className="rounded-full"><Share2 className="mr-1 h-4 w-4" /> Share</Button>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">{ep.desc}</p>

          <h2 className="mt-8 mb-3 font-display text-xl font-bold flex items-center gap-2"><MessageCircle className="h-5 w-5" /> Komentar</h2>
          <div className="space-y-3">
            {["Lucu banget Nailong! 😂", "Episode favorit gua sejauh ini", "Mama Long muncul lagi ❤️"].map((c, i) => (
              <Card key={i} className="flex gap-3 p-3">
                <Avatar><AvatarFallback>U{i}</AvatarFallback></Avatar>
                <div>
                  <div className="text-sm font-semibold">User{i + 1}</div>
                  <div className="text-sm text-muted-foreground">{c}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <aside>
          <h3 className="mb-3 font-display text-lg font-bold">Episode Lain</h3>
          <div className="space-y-3">
            {others.map((o) => (
              <Link key={o.id} to="/watch/$episodeId" params={{ episodeId: o.id }}>
                <Card className="flex gap-3 overflow-hidden p-2 transition hover:nailong-glow">
                  <img src={o.thumb} alt="" className="h-16 w-24 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="line-clamp-2 text-sm font-semibold">{o.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{o.duration}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </PublicLayout>
  );
}
