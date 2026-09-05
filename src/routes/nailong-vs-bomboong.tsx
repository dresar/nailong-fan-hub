import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import vsImg from "@/assets/vs-banner.jpg";
import nailongImg from "@/assets/nailong-happy.jpg";
import { Heart, Flame } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/nailong-vs-bomboong")({
  head: () => ({ meta: [{ title: "Nailong vs Bomboong — Fan Hub" }, { name: "description", content: "Battle epik Nailong (cute wholesome) vs Bomboong (chaotic meme)." }] }),
  component: VS,
});

function VS() {
  const [votes, setVotes] = useState({ nailong: 6420, bomboong: 3120 });
  const total = votes.nailong + votes.bomboong;
  const nPct = (votes.nailong / total) * 100;

  return (
    <PublicLayout>
      <PageHeader eyebrow="Battle" title="Nailong VS Bomboong ⚔️" subtitle="Dua ikon meme. Satu pemenang. Pilih sisimu sekarang." />
      <section className="mx-auto max-w-7xl px-4">
        <img src={vsImg} alt="VS" className="rounded-4xl nailong-glow" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2">
        <Card className="border-primary/40 bg-primary/10 p-6">
          <img src={nailongImg} alt="Nailong" className="mx-auto h-40 w-40 rounded-full object-cover" />
          <h3 className="mt-4 text-center font-display text-3xl font-bold text-primary">NAILONG</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">Cute. Wholesome. Soft.</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>✅ Ekspresi gemoy</li>
            <li>✅ Cocok untuk reaction</li>
            <li>✅ Disukai semua usia</li>
          </ul>
          <Button className="mt-6 w-full rounded-full" onClick={() => { setVotes(v => ({ ...v, nailong: v.nailong + 1 })); toast.success("Vote Nailong tercatat! 🐲"); }}>
            <Heart className="mr-2 h-4 w-4" /> Vote Nailong
          </Button>
        </Card>
        <Card className="border-destructive/40 bg-destructive/10 p-6">
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-destructive/20 text-6xl">💥</div>
          <h3 className="mt-4 text-center font-display text-3xl font-bold text-destructive">BOMBOONG</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">Chaotic. Brainrot. Italian.</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>💥 Energi absurd</li>
            <li>💥 Suara ikonik</li>
            <li>💥 Brainrot purist</li>
          </ul>
          <Button variant="destructive" className="mt-6 w-full rounded-full" onClick={() => { setVotes(v => ({ ...v, bomboong: v.bomboong + 1 })); toast.success("Vote Bomboong tercatat! 💥"); }}>
            <Flame className="mr-2 h-4 w-4" /> Vote Bomboong
          </Button>
        </Card>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <Card className="p-6">
          <h3 className="mb-4 font-display text-xl font-bold">Hasil Voting Live</h3>
          <div className="mb-2 flex justify-between text-sm">
            <span>🐲 Nailong</span><span>{votes.nailong.toLocaleString()} ({nPct.toFixed(1)}%)</span>
          </div>
          <Progress value={nPct} className="h-3" />
          <div className="mt-4 mb-2 flex justify-between text-sm">
            <span>💥 Bomboong</span><span>{votes.bomboong.toLocaleString()} ({(100 - nPct).toFixed(1)}%)</span>
          </div>
          <Progress value={100 - nPct} className="h-3" />
        </Card>
      </section>
    </PublicLayout>
  );
}
