import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Panel } from "@/components/layout/AppShell";
import { suppliers } from "@/lib/warehouse-data";

export const Route = createFileRoute("/suppliers")({
  head: () => ({
    meta: [
      { title: "Suppliers — Polytron Warehouse System" },
      {
        name: "description",
        content:
          "Data supplier kemasan Polytron: kode, nama perusahaan, kota, kontak, jenis kemasan yang disuplai, dan status.",
      },
      { property: "og:title", content: "Suppliers — Polytron Warehouse System" },
      {
        property: "og:description",
        content: "Direktori supplier kemasan beserta status kerja samanya.",
      },
    ],
  }),
  component: Suppliers,
});

function Suppliers() {
  const aktif = suppliers.filter((s) => s.status === "Aktif").length;

  return (
    <AppShell
      title="Suppliers"
      meta={`${suppliers.length} supplier terdaftar · ${aktif} aktif`}
      action={
        <button className="label-caps bg-ink px-4 py-2.5 text-ink-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5">
          Tambah supplier
        </button>
      }
    >
      <div className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((s) => (
          <article key={s.kode} className="group bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="label-caps text-muted-foreground">{s.kode}</span>
              <span
                className={`label-caps border px-2 py-0.5 ${
                  s.status === "Aktif"
                    ? "border-[var(--ok)] text-[var(--ok)]"
                    : "border-border text-muted-foreground"
                }`}
              >
                {s.status}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold leading-snug">{s.nama}</h3>
            <div className="mt-3 h-1 w-8 bg-primary transition-all group-hover:w-16" />
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Kota</dt>
                <dd className="font-medium">{s.kota}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Kontak</dt>
                <dd className="font-mono text-xs">{s.kontak}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Suplai</dt>
                <dd className="text-right font-medium">{s.tipe}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <Panel title="Catatan Pengadaan" className="mt-6">
        <p className="px-5 py-4 text-sm text-muted-foreground">
          Supplier nonaktif tetap tersimpan untuk keperluan audit histori
          penerimaan barang dan tidak dapat dipilih pada transaksi masuk baru.
        </p>
      </Panel>
    </AppShell>
  );
}
