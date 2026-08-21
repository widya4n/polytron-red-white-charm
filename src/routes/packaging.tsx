import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/layout/AppShell";
import { packaging } from "@/lib/warehouse-data";

export const Route = createFileRoute("/packaging")({
  head: () => ({
    meta: [
      { title: "Tipe Kemasan — Polytron Warehouse System" },
      {
        name: "description",
        content:
          "Master data tipe kemasan Polytron: dimensi, satuan, stok saat ini, dan batas minimum per jenis packaging.",
      },
      { property: "og:title", content: "Tipe Kemasan — Polytron Warehouse System" },
      {
        property: "og:description",
        content: "Master data jenis kemasan beserta batas minimum stoknya.",
      },
    ],
  }),
  component: PackagingPage,
});

function PackagingPage() {
  const kritis = packaging.filter((p) => p.stok < p.minimum);

  return (
    <AppShell
      title="Tipe Kemasan"
      meta={`${packaging.length} jenis packaging · ${kritis.length} di bawah minimum`}
      action={
        <button className="label-caps bg-ink px-4 py-2.5 text-ink-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5">
          Tambah tipe
        </button>
      }
    >
      {kritis.length > 0 && (
        <div className="mb-6 flex items-center gap-4 border border-primary/40 bg-accent px-5 py-4">
          <span className="h-8 w-1.5 bg-primary" />
          <p className="text-sm">
            <span className="label-caps mr-2 text-primary">Perhatian</span>
            {kritis.map((p) => p.nama).join(", ")} berada di bawah batas minimum
            stok. Ajukan pengadaan ke supplier terkait.
          </p>
        </div>
      )}

      <Panel title="Master Data Kemasan">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                {["Kode", "Nama", "Dimensi", "Satuan", "Stok", "Minimum", "Status"].map((h) => (
                  <th
                    key={h}
                    className={`label-caps px-5 py-2.5 text-muted-foreground ${
                      h === "Stok" || h === "Minimum" ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packaging.map((p) => {
                const low = p.stok < p.minimum;
                return (
                  <tr key={p.kode} className="border-b border-border last:border-0 hover:bg-accent/40">
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{p.kode}</td>
                    <td className="px-5 py-3.5 font-semibold">{p.nama}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{p.dimensi}</td>
                    <td className="px-5 py-3.5">{p.unit}</td>
                    <td className="numeric px-5 py-3.5 text-right font-bold">
                      {p.stok.toLocaleString("id-ID")}
                    </td>
                    <td className="numeric px-5 py-3.5 text-right text-muted-foreground">
                      {p.minimum.toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`label-caps border px-2 py-0.5 ${
                          low ? "border-primary text-primary" : "border-[var(--ok)] text-[var(--ok)]"
                        }`}
                      >
                        {low ? "Kritis" : "Aman"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
