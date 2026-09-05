import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useCreateAdminItem, useAdminCategories } from "@/lib/queries";
import { LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/admin/shop/new")({
  component: NewProduct,
});

function NewProduct() {
  const navigate = useNavigate();
  const { data: categories } = useAdminCategories();
  const productCategories = categories?.filter((c: any) => c.type === "product");
  
  const createProduct = useCreateAdminItem("products", "products");
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    img: "",
    affiliateUrl: "",
    category: productCategories?.[0]?.name || "",
    stock: 0,
    rating: "4.5",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    createProduct.mutate({ ...formData, id }, {
      onSuccess: () => {
        toast.success("Produk berhasil ditambahkan!");
        navigate({ to: "/admin/shop" });
      },
      onError: (err: any) => toast.error(err.message),
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/shop"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="font-display text-3xl font-bold">Tambah Produk Affiliate Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Nama Produk</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Contoh: Boneka Nailong Gembul 30cm" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  Pilih Kategori
                  <Link to="/admin/categories" className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                    <LayoutGrid className="h-3 w-3" /> Kelola Kategori
                  </Link>
                </Label>
                {productCategories && productCategories.length > 0 ? (
                  <select 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Pilih Kategori...</option>
                    {productCategories.map((c: any) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-xs text-muted-foreground p-3 border border-dashed rounded-md">
                    Belum ada kategori produk. <Link to="/admin/categories" className="text-primary hover:underline">Buat sekarang</Link>
                  </div>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Harga (Rp)</Label>
                  <Input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <Label>Stok Awal</Label>
                  <Input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <ExternalLink className="h-4 w-4" /> Link Affiliate Marketplace
            </h2>
            <div className="space-y-2">
              <Label>URL Shopee / Tokopedia / Dll</Label>
              <Input required value={formData.affiliateUrl} onChange={e => setFormData({...formData, affiliateUrl: e.target.value})} placeholder="https://shopee.co.id/..." />
              <p className="text-[10px] text-muted-foreground italic">Link ini akan dituju saat fans menekan tombol beli di website.</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Media Produk
            </h2>
            <div className="space-y-4">
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted border border-dashed border-border flex items-center justify-center">
                {formData.img ? (
                  <img src={formData.img} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground opacity-20" />
                    <p className="mt-2 text-xs text-muted-foreground">Preview Gambar</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>URL Gambar</Label>
                <Input value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} placeholder="https://..." />
              </div>
            </div>
          </Card>

          <Button type="submit" className="w-full rounded-full nailong-glow" size="lg" disabled={createProduct.isPending}>
            {createProduct.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Produk
          </Button>
          <Button variant="ghost" className="w-full rounded-full" asChild>
            <Link to="/admin/shop">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
