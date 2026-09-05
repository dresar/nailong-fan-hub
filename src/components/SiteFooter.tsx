import { Link } from "@tanstack/react-router";
import { Heart, Github, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="font-display text-xl font-bold">🐲 Nailong Fan Hub</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Rumah resmi (tidak resmi) untuk semua fans naga kuning paling lucu sejagat.
          </p>
        </div>
        <div>
          <div className="mb-3 font-semibold">Jelajahi</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/characters" className="hover:text-foreground">Karakter</Link></li>
            <li><Link to="/watch" className="hover:text-foreground">Nonton</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Galeri</Link></li>
            <li><Link to="/memes" className="hover:text-foreground">Memes</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-semibold">Komunitas</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/community" className="hover:text-foreground">Forum</Link></li>
            <li><Link to="/leaderboard" className="hover:text-foreground">Top Fans</Link></li>
            <li><Link to="/events" className="hover:text-foreground">Event</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Kontak</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 font-semibold">Ikuti</div>
          <div className="flex gap-3">
            <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/40"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/40"><Youtube className="h-4 w-4" /></a>
            <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/40"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        Dibuat dengan <Heart className="inline h-3 w-3 text-destructive" /> oleh fans Nailong • © 2025
      </div>
    </footer>
  );
}
