import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageHeader } from "@/components/PublicLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/mock";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — Nailong Fan Hub" }] }),
  component: FAQ,
});

function FAQ() {
  return (
    <PublicLayout>
      <PageHeader eyebrow="Bantuan" title="Pertanyaan Umum 💬" />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="rounded-2xl border bg-card px-4">
              <AccordionTrigger className="font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PublicLayout>
  );
}
