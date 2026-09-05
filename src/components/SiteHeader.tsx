import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, User as UserIcon, LogOut, Sparkles } from "lucide-react";
import nailongHappy from "@/assets/nailong-happy.jpg";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/characters", label: "Karakter" },
  { to: "/watch", label: "Nonton" },
  { to: "/gallery", label: "Galeri" },
  { to: "/memes", label: "Memes" },
  { to: "/community", label: "Komunitas" },
  { to: "/shop", label: "Shop" },
  { to: "/nailong-vs-bomboong", label: "VS Bomboong" },
] as const;

export function SiteHeader() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <img src={nailongHappy} alt="Nailong" className="h-10 w-10 rounded-full object-cover nailong-glow" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nailong Fan Hub
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-primary/15 hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full bg-primary/15 p-1 pr-3 hover:bg-primary/25">
                  <img src={user.avatar || nailongHappy} alt="" className="h-8 w-8 rounded-full object-cover" />
                  <span className="text-sm font-medium">{user.username}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link to="/profile"><UserIcon className="mr-2 h-4 w-4" />Profil</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/my-collection"><Sparkles className="mr-2 h-4 w-4" />Koleksiku</Link></DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild><Link to="/admin">Admin Panel</Link></DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="rounded-full px-6">
              <Link to="/login">Masuk</Link>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary/15 data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
