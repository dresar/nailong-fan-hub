import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Daftar — Nailong Fan Hub" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <Card className="p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <h1 className="text-3xl">🐲</h1>
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Pendaftaran Ditutup</h1>
          <p className="mt-4 text-muted-foreground">
            Mohon maaf, pendaftaran akun publik saat ini sedang ditutup. 
            Nailong Fan Hub hanya tersedia untuk anggota komunitas yang telah terdaftar.
          </p>
          <div className="mt-8 space-y-4">
            <Button className="w-full rounded-full" onClick={() => navigate({ to: "/login" })}>
              Kembali ke Login
            </Button>
            <Button variant="ghost" className="w-full rounded-full" onClick={() => navigate({ to: "/" })}>
              Kembali ke Beranda
            </Button>
          </div>
        </Card>
      </div>
    </PublicLayout>
  );
}
