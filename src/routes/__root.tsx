import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Halaman tidak ditemukan</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Nailong juga bingung. Halaman ini tidak ada.
        </p>
        <div className="mt-6">
          <a href="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            Kembali ke Sarang
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nailong Fan Hub — Komunitas Naga Kuning Paling Lucu 🐲" },
      { name: "description", content: "Album, episode terbaru, meme gembul, dan koleksi virtual Nailong (奶龙) terlengkap. Bergabunglah dengan komunitas fans Nailong vs Bomboong Indonesia!" },
      { name: "keywords", content: "nailong, naga kuning, naga susu, milk dragon, bomboong, meme nailong, episode nailong, fan hub, komunitas nailong" },
      { property: "og:title", content: "Nailong Fan Hub — Pusat Penggemar Naga Kuning Indonesia" },
      { property: "og:description", content: "Tonton episode terbaru, download meme lucu, dan koleksi item langka di Sarang Nailong." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Nailong Fan Hub" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nailong Fan Hub — Komunitas Naga Kuning Paling Lucu" },
      { name: "twitter:description", content: "Pusat konten Nailong terlengkap di Indonesia." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b57996be-0493-48b2-801d-fe8cfeec01d9" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b57996be-0493-48b2-801d-fe8cfeec01d9" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
