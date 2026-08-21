import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel, KondisiTag } from "@/components/layout/AppShell";
import { barcodes } from "@/lib/warehouse-data";

export const Route = createFileRoute("/barcode")({
  head: () => ({
    meta: [
      { title: "Kelola Barcode — Polytron Warehouse System" },
      {
        name: "description",
        content:
          "Kelola dan cetak label barcode kemasan Polytron, lengkap dengan lokasi rak, tipe, dan kondisi barang.",
      },
      { property: "og:title", content: "Kelola Barcode — Polytron Warehouse System" },
      {
        property: "og:description",
        content: "Pencetakan dan penelusuran label barcode kemasan gudang.",
      },
    ],
  }),
  component: BarcodePage,
});

function BarcodePage() {
  return (
    <AppShell
      title="Kelola Barcode"
      meta={`${barcodes.length} label aktif · format PLT-XXX-0000000`}
      action={
        <button className="label-caps bg-primary px-4 py-2.5 text-primary-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5">
          Generate barcode
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Panel title="Registrasi Label">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  {["Barcode", "Tipe", "Lokasi", "Kondisi", "Dicetak"].map((h) => (
                    <th key={h} className="label-caps px-5 py-2.5 text-left text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {barcodes.map((b) => (
                  <tr key={b.barcode} className="border-b border-border last:border-0 hover:bg-accent/40">
                    <td className="px-5 py-3.5 font-mono text-xs font-semibold">{b.barcode}</td>
                    <td className="px-5 py-3.5 font-semibold">{b.tipe}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{b.lokasi}</td>
                    <td className="px-5 py-3.5"><KondisiTag value={b.kondisi} /></td>
                    <td className="px-5 py-3.5 text-muted-foreground">{b.dicetak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Pratinjau Label">
          <div className="p-5">
            <div className="border-2 border-ink bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="label-caps">Polytron</span>
                <span className="label-caps text-primary">Kudus</span>
              </div>
              <div className="mt-3 flex h-16 items-end gap-[2px]">
                {Array.from({ length: 46 }).map((_, i) => (
                  <span
                    key={i}
                    className="block h-full bg-ink"
                    style={{ width: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 1.5 }}
                  />
                ))}
              </div>
              <p className="mt-2 text-center font-mono text-xs tracking-widest">
                PLT-KRT-0093214
              </p>
              <div className="mt-3 border-t border-ink pt-2 text-center">
                <p className="label-caps">KARTON · RAK A1-03</p>
              </div>
            </div>
            <button className="label-caps mt-5 w-full border border-ink py-3 transition-colors hover:bg-ink hover:text-ink-foreground">
              Cetak label
            </button>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
