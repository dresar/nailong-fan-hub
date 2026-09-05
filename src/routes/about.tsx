import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import nailongHappy from "@/assets/nailong-happy.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "Tentang Nailong — Fan Hub" }, { name: "description", content: "Sejarah, asal-usul, dan perjalanan viral Nailong." }] }),
  component: About,
});

const timeline = [
  { y: "2022", t: "Lahir", d: "Serial animasi pendek Nailong (奶龙) pertama tayang di platform China." },
  { y: "2023", t: "Mulai Viral", d: "Klip pendek Nailong tersebar di Douyin dan menarik perhatian." },
  { y: "2024", t: "Meme Global", d: "Ekspresi marah Nailong jadi reaction meme di Twitter/X & TikTok." },
  { y: "2025", t: "Era Bomboong", d: "Rivalitas dengan Bomboong dari Italian Brainrot menggemparkan internet." },
];

function About() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="Tentang" title="Mengenal Sang Naga Kuning 🐲" subtitle="Nailong (奶龙 / Naga Susu) adalah karakter naga kuning bulat dari serial animasi pendek China yang menjadi fenomena meme global." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 md:grid-cols-2">
        <img src={nailongHappy} alt="Nailong" className="rounded-4xl nailong-glow" />
        <div className="space-y-4 text-muted-foreground">
          <p>Nailong pertama kali muncul dalam serial animasi pendek bertema keluarga di China. Bentuknya bulat, berwarna kuning telur cerah, dengan mata hijau besar dan perut putih lembut.</p>
          <p>Kekuatan super Nailong bukan terbang atau menyemburkan api — tapi <strong>ekspresi wajahnya</strong>. Marah, bingung, sedih, gembira — semuanya menjadi reaction meme yang dipakai jutaan orang di seluruh dunia.</p>
          <p>Di tahun 2024-2025, Nailong meledak di TikTok internasional. Fans bermunculan, merchandise sold out, dan rivalitas lucu dengan karakter <em>Bomboong</em> dari semesta Italian Brainrot lahir secara organik.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 font-display text-3xl font-bold">Timeline Viral</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {timeline.map((t) => (
            <Card key={t.y} className="p-5">
              <div className="font-display text-3xl font-bold text-primary">{t.y}</div>
              <div className="mt-2 font-semibold">{t.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
