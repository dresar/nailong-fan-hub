import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Loader2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useAdminReports, useDeleteAdminItem } from "@/lib/queries";

export const Route = createFileRoute("/admin/moderation")({
  component: Mod,
});

function Mod() {
  const { data: reports, isLoading } = useAdminReports();
  const deleteReport = useDeleteAdminItem("reports", "reports");

  const handleAction = (id: string, action: "approve" | "reject") => {
    deleteReport.mutate(id, {
      onSuccess: () => toast.success(action === "approve" ? "Laporan disetujui" : "Laporan ditolak"),
      onError: (err: any) => toast.error(err.message),
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-bold">Moderasi</h1>
      
      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
      ) : reports?.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
          <ShieldAlert className="mb-4 h-12 w-12 opacity-20" />
          <p>Tidak ada laporan pending saat ini.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {reports?.map((r: any) => (
            <Card key={r.id} className="flex items-center gap-4 p-4 transition-all hover:shadow-md">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{r.target}</span>
                  <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">{r.reason}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Dilaporkan oleh <span className="font-medium text-foreground">{r.reporter}</span> • {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>
              <Button size="sm" variant="outline" className="rounded-full border-green-500/50 hover:bg-green-50" onClick={() => handleAction(r.id, "approve")}>
                <Check className="mr-1 h-4 w-4 text-green-500" />Approve
              </Button>
              <Button size="sm" variant="destructive" className="rounded-full" onClick={() => handleAction(r.id, "reject")}>
                <X className="mr-1 h-4 w-4" />Reject
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
