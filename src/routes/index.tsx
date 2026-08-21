import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Panel, KondisiTag } from "@/components/layout/AppShell";
import {
  CAPACITY,
  incoming,
  outgoing,
  stock,
  totalStock,
  usedPercent,
  suppliers,
  packaging,
} from "@/lib/warehouse-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Gudang — Polytron Warehouse System" },
      {
        name: "description",
        content:
          "Pantau stok kemasan, kapasitas gudang, dan transaksi masuk/keluar Polytron dalam satu dashboard operasional.",
      },
      { property: "og:title", content: "Dashboard Gudang — Polytron Warehouse System" },
      {
        property: "og:description",
        content:
          "Stok kemasan, kapasitas gudang, dan pergerakan barang harian dalam satu layar.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Total Stok", value: totalStock.toLocaleString("id-ID"), note: "item tersedia" },
  { label: "Tipe Kemasan", value: String(packaging.length), note: "jenis packaging" },
  { label: "Suppliers", value: String(suppliers.filter((s) => s.status === "Aktif").length), note: "supplier aktif" },
  { label: "Item Karantina", value: "18", note: "perlu perhatian" },
];

function Dashboard() {
  const remaining = CAPACITY - totalStock;

  return (
    <AppShell
      title="Dashboard"
      meta="Jumat, 21 Agustus 2026 · Gudang Kemasan — Kudus"
      action={
        <div className="flex gap-2">
          <Link
            to="/incoming"
            className="label-caps bg-ink px-4 py-2.5 text-ink-foreground transition-transform hover:-translate-y-0.5"
          >
            Scan Masuk
          </Link>
          <Link
            to="/outgoing"
            className="label-caps bg-primary px-4 py-2.5 text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Scan Keluar
          </Link>
        </div>
      }
    >
      <section className="mb-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface p-5">
            <p className="label-caps text-muted-foreground">{s.label}</p>
            <p className="numeric mt-3 text-4xl font-extrabold">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
            <div className="mt-4 h-1 w-10 bg-primary" />
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          title="Stok Terkini per Jenis & Kondisi"
          className="lg:col-span-2"
          right={
            <span className="label-caps text-muted-foreground">
              {stock.length} baris
            </span>
          }
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                <th className="label-caps px-5 py-2.5 text-left text-muted-foreground">Tipe Packaging</th>
                <th className="label-caps px-5 py-2.5 text-left text-muted-foreground">Kondisi</th>
                <th className="label-caps px-5 py-2.5 text-right text-muted-foreground">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((row) => (
                <tr key={row.tipe} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-5 py-3 font-semibold">{row.tipe}</td>
                  <td className="px-5 py-3">
                    <KondisiTag value={row.kondisi} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="numeric text-base font-bold">
                      {row.jumlah.toLocaleString("id-ID")}
                    </span>
                    <span className="ml-1.5 text-xs text-muted-foreground">{row.unit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={`Kapasitas Gudang · maks ${CAPACITY.toLocaleString("id-ID")}`}>
          <div className="p-5">
            <div className="flex items-end justify-between">
              <span className="numeric text-5xl font-extrabold text-primary">
                {usedPercent.toFixed(1)}%
              </span>
              <span className="label-caps text-muted-foreground">terpakai</span>
            </div>

            <div className="mt-4 h-6 w-full border border-ink bg-muted">
              <div
                className="h-full bg-ink"
                style={{ width: `${usedPercent}%` }}
              />
            </div>

            <dl className="mt-6 grid gap-px border border-border bg-border">
              <div className="flex items-center justify-between bg-surface px-4 py-3">
                <dt className="label-caps text-muted-foreground">Stok terpakai</dt>
                <dd className="numeric font-bold">{totalStock.toLocaleString("id-ID")} pcs</dd>
              </div>
              <div className="flex items-center justify-between bg-surface px-4 py-3">
                <dt className="label-caps text-muted-foreground">Kapasitas sisa</dt>
                <dd className="numeric font-bold text-primary">
                  {remaining.toLocaleString("id-ID")} pcs
                </dd>
              </div>
            </dl>

            <p className="mt-5 border-l-2 border-primary pl-3 text-xs text-muted-foreground">
              Sisa kapasitas cukup untuk ±2 minggu penerimaan karton pada laju
              rata-rata 600 box/hari.
            </p>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Masuk Terbaru"
          right={
            <Link to="/incoming" className="label-caps text-primary hover:underline">
              Lihat semua
            </Link>
          }
        >
          <ul>
            {incoming.slice(0, 3).map((t) => (
              <li key={t.barcode} className="flex items-center gap-4 border-b border-border px-5 py-3.5 last:border-0">
                <span className="h-8 w-1 bg-[var(--ok)]" />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-muted-foreground">{t.barcode}</p>
                  <p className="truncate text-sm font-semibold">{t.tipe} · {t.pihak}</p>
                </div>
                <span className="numeric ml-auto font-bold">+{t.qty}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Keluar Terbaru"
          right={
            <Link to="/outgoing" className="label-caps text-primary hover:underline">
              Lihat semua
            </Link>
          }
        >
          <ul>
            {outgoing.slice(0, 3).map((t) => (
              <li key={t.barcode} className="flex items-center gap-4 border-b border-border px-5 py-3.5 last:border-0">
                <span className="h-8 w-1 bg-primary" />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-muted-foreground">{t.barcode}</p>
                  <p className="truncate text-sm font-semibold">{t.tipe} · {t.pihak}</p>
                </div>
                <span className="numeric ml-auto font-bold text-primary">−{t.qty}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
