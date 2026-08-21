import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel, KondisiTag } from "@/components/layout/AppShell";
import { incoming } from "@/lib/warehouse-data";

export const Route = createFileRoute("/incoming")({
  head: () => ({
    meta: [
      { title: "Transaksi Masuk — Polytron Warehouse System" },
      {
        name: "description",
        content:
          "Daftar penerimaan kemasan dari supplier: barcode, tipe, kondisi, jumlah, dan petugas verifikator.",
      },
      { property: "og:title", content: "Transaksi Masuk — Polytron Warehouse System" },
      {
        property: "og:description",
        content: "Riwayat penerimaan barang kemasan beserta verifikatornya.",
      },
    ],
  }),
  component: Incoming,
});

function Incoming() {
  const total = incoming.reduce((s, t) => s + t.qty, 0);

  return (
    <AppShell
      title="Transaksi Masuk"
      meta={`${incoming.length} transaksi · ${total.toLocaleString("id-ID")} unit diterima`}
      action={
        <button className="label-caps bg-ink px-4 py-2.5 text-ink-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5">
          Scan barang masuk
        </button>
      }
    >
      <Panel title="Daftar Penerimaan Barang">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                {["Tanggal", "Barcode", "Tipe", "Supplier", "Kondisi", "Qty", "Verifikator"].map((h) => (
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
              {incoming.map((t) => (
                <tr key={t.barcode} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">{t.tanggal}</td>
                  <td className="px-5 py-3.5 font-mono text-xs">{t.barcode}</td>
                  <td className="px-5 py-3.5 font-semibold">{t.tipe}</td>
                  <td className="px-5 py-3.5">{t.pihak}</td>
                  <td className="px-5 py-3.5"><KondisiTag value={t.kondisi} /></td>
                  <td className="numeric px-5 py-3.5 text-right font-bold text-[var(--ok)]">+{t.qty}</td>
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
