import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-8">
      {eyebrow && <div className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary-foreground/80">{eyebrow}</div>}
      <h1 className="font-display text-4xl font-bold md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </section>
  );
}
