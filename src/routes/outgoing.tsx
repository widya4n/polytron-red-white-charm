import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel, KondisiTag } from "@/components/layout/AppShell";
import { outgoing } from "@/lib/warehouse-data";

export const Route = createFileRoute("/outgoing")({
  head: () => ({
    meta: [
      { title: "Transaksi Keluar — Polytron Warehouse System" },
      {
        name: "description",
        content:
          "Daftar pengeluaran kemasan ke line produksi dan ekspedisi: barcode, tipe, tujuan, jumlah, dan petugas.",
      },
      { property: "og:title", content: "Transaksi Keluar — Polytron Warehouse System" },
      {
        property: "og:description",
        content: "Riwayat pengeluaran barang kemasan ke line produksi dan ekspedisi.",
      },
    ],
  }),
  component: Outgoing,
});

function Outgoing() {
  const total = outgoing.reduce((s, t) => s + t.qty, 0);

  return (
    <AppShell
      title="Transaksi Keluar"
      meta={`${outgoing.length} transaksi · ${total.toLocaleString("id-ID")} unit dikeluarkan`}
      action={
        <button className="label-caps bg-primary px-4 py-2.5 text-primary-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5">
          Scan barang keluar
        </button>
      }
    >
      <Panel title="Daftar Pengeluaran Barang">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                {["Tanggal", "Barcode", "Tipe", "Tujuan", "Kondisi", "Qty", "Petugas"].map((h) => (
                  <th
                    key={h}
                    className={`label-caps px-5 py-2.5 text-muted-foreground ${h === "Qty" ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {outgoing.map((t) => (
                <tr key={t.barcode} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">{t.tanggal}</td>
                  <td className="px-5 py-3.5 font-mono text-xs">{t.barcode}</td>
                  <td className="px-5 py-3.5 font-semibold">{t.tipe}</td>
                  <td className="px-5 py-3.5">{t.pihak}</td>
                  <td className="px-5 py-3.5"><KondisiTag value={t.kondisi} /></td>
                  <td className="numeric px-5 py-3.5 text-right font-bold text-primary">−{t.qty}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.petugas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
