import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import nailong from "@/assets/nailong-happy.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Masuk — Nailong Fan Hub" }] }),
  component: Login,
});

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate({ to: user.role === "admin" ? "/admin" : "/" });
    }
  }, [user, navigate]);

  const handleLogin = async (e?: React.FormEvent, u?: string, p?: string) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      await login(u || username, p || password);
      toast.success("Berhasil masuk!");
      // Navigation will be handled by useEffect
    } catch (err: any) {
      toast.error(err.message || "Gagal masuk");
    } finally {
      setIsLoading(false);
    }
  };

  if (user) return null;

  return (
    <PublicLayout>
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center">
        <div className="text-center md:text-left">
          <img src={nailong} alt="Nailong" className="mx-auto h-48 w-48 rounded-full object-cover nailong-glow float md:mx-0" />
          <h1 className="mt-6 font-display text-4xl font-bold">Selamat Datang Kembali!</h1>
          <p className="mt-2 text-muted-foreground">Nailong sudah merindukanmu 🐲💛</p>
        </div>
        <Card className="p-8">
          <h2 className="font-display text-2xl font-bold">Masuk</h2>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <Label>Username</Label>
              <Input 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username anda" 
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input 
                required 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
              />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
              {isLoading ? "Masuk..." : "Masuk"}
            </Button>
            
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Atau Demo Login</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-full border-primary/50 hover:bg-primary/10"
                onClick={() => handleLogin(undefined, "AdminNailong", "password123")}
              >
                Demo Admin
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-full border-accent/50 hover:bg-accent/10"
                onClick={() => handleLogin(undefined, "NailongLover88", "password123")}
              >
                Demo Fan
              </Button>
            </div>
            
            <p className="text-center text-xs text-muted-foreground mt-4">
              Pendaftaran publik saat ini ditutup. Situs ini hanya untuk fanbase Nailong.
            </p>
          </form>
        </Card>
      </div>
    </PublicLayout>
  );
}
