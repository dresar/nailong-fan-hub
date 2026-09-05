import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { LayoutDashboard, Users, FileText, ShieldAlert, Settings, ArrowLeft, Newspaper, ShoppingBag, Calendar, LayoutGrid } from "lucide-react";
import nailong from "@/assets/nailong-happy.jpg";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Nailong Fan Hub" }] }),
  component: AdminLayout,
});

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/content", label: "Konten Media", icon: FileText },
  { to: "/admin/news", label: "Berita & Update", icon: Newspaper },
  { to: "/admin/shop", label: "Manajemen Toko", icon: ShoppingBag },
  { to: "/admin/events", label: "Acara & Event", icon: Calendar },
  { to: "/admin/characters", label: "Profil Karakter", icon: Users },
  { to: "/admin/categories", label: "Manajemen Kategori", icon: LayoutGrid },
  { to: "/admin/moderation", label: "Moderasi", icon: ShieldAlert },
  { to: "/admin/settings", label: "Pengaturan", icon: Settings },
];

function AdminLayout() {
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    if (user && user.role !== "admin") nav({ to: "/" });
  }, [user, nav]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold">Akses ditolak</h1>
          <p className="mt-2 text-muted-foreground">Login sebagai admin untuk mengakses panel.</p>
          <Link to="/login" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sticky Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-sidebar p-4 md:flex md:flex-col">
        <Link to="/" className="flex items-center gap-2 px-2 py-2">
          <img src={nailong} alt="" className="h-9 w-9 rounded-full object-cover" />
          <div><div className="font-display font-bold">Nailong Admin</div><div className="text-xs text-muted-foreground">Panel</div></div>
        </Link>
        <nav className="mt-6 flex-1 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/15 hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              <n.icon className="h-4 w-4" />{n.label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground border-t border-border/40 pt-4"><ArrowLeft className="h-4 w-4" /> Kembali ke situs</Link>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky Header */}
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/80 px-6 backdrop-blur-md">
          <div className="font-semibold">Selamat datang, {user.name} 👋</div>
          <div className="flex items-center gap-3">
             <div className="hidden text-right md:block">
                <div className="text-xs font-bold leading-none">{user.username}</div>
                <div className="text-[10px] text-muted-foreground uppercase">{user.role}</div>
             </div>
             <img src={user.avatar || nailong} alt="" className="h-8 w-8 rounded-full border border-border object-cover" />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-primary/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
