import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImg from "@/assets/hero-nailong.jpg";
import vsImg from "@/assets/vs-banner.jpg";
import { useEpisodes, useCharacters, useMemes } from "@/lib/queries";
import { Sparkles, Users, Film, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nailong Fan Hub — Beranda" },
      { name: "description", content: "Semua tentang Nailong: episode, meme, koleksi, dan komunitas." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: episodes = [] } = useEpisodes();
  const { data: characters = [] } = useCharacters();
  const { data: memes = [] } = useMemes();

  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-12 pb-16 md:grid-cols-2 md:pt-20 md:pb-24">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3 w-3" /> #1 Fan Hub Resmi (Tidak Resmi)
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              Selamat datang di <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Sarang Nailong</span> 🐲
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Album, episode, meme, koleksi virtual, dan komunitas penggemar naga susu paling
              menggemaskan dari Tiongkok. Bergabunglah dengan ribuan fans!
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6 nailong-glow">
                <Link to="/register">Gabung Komunitas <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link to="/watch">Tonton Episode</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { n: "1.2M+", l: "Fans" },
                { n: "120+", l: "Episode" },
                { n: "5K+", l: "Memes" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-card/60 p-4 text-center backdrop-blur">
                  <div className="font-display text-2xl font-bold text-primary">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={heroImg} alt="Nailong" width={1600} height={900} className="w-full rounded-4xl nailong-glow float" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold">Episode Terbaru 🎬</h2>
          <Link to="/watch" className="text-sm font-semibold text-primary hover:underline">Lihat semua →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {episodes.slice(0, 4).map((ep) => (
            <Link key={ep.id} to="/watch/$episodeId" params={{ episodeId: ep.id }}>
              <Card className="overflow-hidden p-0 transition hover:scale-[1.02] hover:nailong-glow">
                <img src={ep.thumb} alt={ep.title} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-3">
                  <div className="line-clamp-1 font-semibold">{ep.title}</div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>{ep.duration}</span><span>{ep.views} views</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <Link to="/nailong-vs-bomboong">
          <div className="relative overflow-hidden rounded-4xl">
            <img src={vsImg} alt="Nailong vs Bomboong" className="h-72 w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-background/80 via-transparent to-background/80">
              <div className="text-center">
                <div className="font-display text-4xl font-bold md:text-6xl">Nailong VS Bomboong</div>
                <div className="mt-2 text-muted-foreground">Pilih sisimu. Vote sekarang →</div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 font-display text-3xl font-bold">Karakter Favorit ⭐</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {characters.slice(0, 3).map((c) => (
            <Card key={c.id} className="overflow-hidden p-0">
              <img src={c.img} alt={c.name} className="h-56 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <div className="font-display text-xl font-bold">{c.name}</div>
                <div className="text-xs text-primary">{c.role}</div>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 font-display text-3xl font-bold">Meme Trending 🔥</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {memes.slice(0, 6).map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-2xl">
              <img src={m.img} alt={m.title} className="aspect-square w-full object-cover transition group-hover:scale-110" loading="lazy" />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 text-xs font-semibold text-white">
                <Heart className="inline h-3 w-3" /> {m.likes}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Film, t: "Album & Episode", d: "Nonton episode lucu Nailong kapan saja." },
            { icon: Users, t: "Komunitas Fans", d: "Diskusi, fanart, dan event seru." },
            { icon: Sparkles, t: "Koleksi Virtual", d: "Kumpulkan kartu Nailong langka." },
          ].map((f) => (
            <Card key={f.t} className="p-6">
              <f.icon className="mb-3 h-8 w-8 text-primary" />
              <div className="font-display text-lg font-bold">{f.t}</div>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
