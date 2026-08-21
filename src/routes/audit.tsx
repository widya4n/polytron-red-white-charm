import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/layout/AppShell";
import { audit } from "@/lib/warehouse-data";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Trail — Polytron Warehouse System" },
      {
        name: "description",
        content:
          "Jejak audit seluruh aktivitas gudang Polytron: siapa melakukan apa, pada objek mana, dan kapan.",
      },
      { property: "og:title", content: "Audit Trail — Polytron Warehouse System" },
      {
        property: "og:description",
        content: "Riwayat aktivitas petugas gudang secara kronologis.",
      },
    ],
  }),
  component: AuditPage,
});

const aksiTone: Record<string, string> = {
  MASUK: "border-[var(--ok)] text-[var(--ok)]",
  KELUAR: "border-primary text-primary",
  KARANTINA: "border-[var(--warn)] text-[var(--warn)]",
  UBAH: "border-ink text-ink",
  TAMBAH: "border-ink text-ink",
};

function AuditPage() {
  return (
    <AppShell
      title="Audit Trail"
      meta={`${audit.length} aktivitas tercatat · retensi 24 bulan`}
      action={
        <button className="label-caps border border-ink px-4 py-2.5 transition-colors hover:bg-ink hover:text-ink-foreground">
          Ekspor CSV
        </button>
      }
    >
      <Panel title="Riwayat Aktivitas">
        <ol className="px-5 py-2">
          {audit.map((a, i) => (
            <li key={i} className="flex gap-5 border-b border-border py-4 last:border-0">
              <div className="w-40 shrink-0">
                <p className="label-caps text-muted-foreground">{a.waktu}</p>
                <p className="mt-1 text-sm font-semibold">{a.aktor}</p>
              </div>
              <div className="shrink-0">
                <span className={`label-caps border px-2 py-0.5 ${aksiTone[a.aksi] ?? "border-border"}`}>
                  {a.aksi}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs font-semibold">{a.objek}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.keterangan}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </AppShell>
  );
}
