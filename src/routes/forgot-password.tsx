import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Lupa Password — Nailong Fan Hub" }] }),
  component: Forgot,
});

function Forgot() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <Card className="p-8">
          <h1 className="font-display text-3xl font-bold">Lupa Password? 🤔</h1>
          <p className="mt-1 text-sm text-muted-foreground">Tenang, Nailong akan bantu reset.</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Link reset terkirim ke email!"); }}>
            <div><Label>Email</Label><Input required type="email" placeholder="email@kamu.com" /></div>
            <Button type="submit" className="w-full rounded-full">Kirim Link Reset</Button>
            <p className="text-center text-sm"><Link to="/login" className="text-primary">Kembali ke Login</Link></p>
          </form>
        </Card>
      </div>
    </PublicLayout>
  );
}
