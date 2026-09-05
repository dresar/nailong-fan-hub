import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Pencil, Trash2, Plus, Loader2, 
  ExternalLink, Search
} from "lucide-react";
import { toast } from "sonner";
import { useAdminProducts, useDeleteAdminItem } from "@/lib/queries";
import nailongHappy from "@/assets/nailong-happy.jpg";

export const Route = createFileRoute("/admin/shop/")({
  component: AdminShop,
});

function AdminShop() {
  const [search, setSearch] = useState("");
  const { data: products, isLoading } = useAdminProducts();
  const deleteProduct = useDeleteAdminItem("products", "products");

  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Hapus produk ini secara permanen?")) {
      deleteProduct.mutate(id, {
        onSuccess: () => toast.success("Produk berhasil dihapus"),
        onError: (err: any) => toast.error(err.message),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Manajemen Toko</h1>
          <p className="text-muted-foreground">Kelola produk affiliate Shopee/Lainnya.</p>
        </div>
        
        <Button className="rounded-full nailong-glow px-6" asChild>
          <Link to="/admin/shop/new"><Plus className="mr-2 h-4 w-4" /> Tambah Produk Baru</Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-card/50 px-4 py-2 border border-border/40 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari produk atau kategori..." 
          className="bg-transparent text-sm outline-none w-full"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center p-24"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts?.map((p: any) => (
            <Card key={p.id} className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img 
                  src={p.img || nailongHappy} 
                  alt="" 
                  className="h-full w-full object-cover transition-transform group-hover:scale-105" 
                  onError={(e) => { (e.target as HTMLImageElement).src = nailongHappy; }}
                />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md" asChild>
                    <Link to="/admin/shop/$productId" params={{ productId: p.id }}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-md" onClick={() => handleDelete(p.id)} disabled={deleteProduct.isPending}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {p.category && (
                  <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
                    {p.category}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold line-clamp-1">{p.name}</h3>
                  <div className="shrink-0 text-xs text-primary font-bold">⭐ {p.rating}</div>
                </div>
                
                <div className="mt-2 font-display text-lg font-bold text-primary">
                  Rp {p.price?.toLocaleString()}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Stok: {p.stock}</div>
                  {p.affiliateUrl && (
                    <a href={p.affiliateUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-accent hover:underline">
                      SHOPEE <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
