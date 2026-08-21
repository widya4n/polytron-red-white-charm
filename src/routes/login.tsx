import { createFileRoute, Link } from "@tanstack/react-router";
import { WarehouseMark } from "@/components/brand/WarehouseMark";
import polytron from "@/assets/polytron.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk — Polytron Warehouse System" },
      {
        name: "description",
        content:
          "Halaman masuk petugas gudang Polytron Warehouse System untuk mengelola stok dan transaksi kemasan.",
      },
      { property: "og:title", content: "Masuk — Polytron Warehouse System" },
      {
        property: "og:description",
        content: "Autentikasi petugas gudang Polytron Warehouse System.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-ink-foreground lg:flex">
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="absolute -right-24 top-1/4 h-72 w-72 rotate-12 bg-primary/15" />

        <div className="relative flex items-center gap-3">
          <WarehouseMark className="h-11 w-11 text-ink-muted" />
          <span className="leading-none">
            <span className="block font-display text-base font-extrabold">WAREHOUSE</span>
            <span className="label-caps block text-primary">Sistem Gudang Kemasan</span>
          </span>
        </div>

        <div className="relative max-w-lg">
          <div className="mb-6 h-1.5 w-24 bg-hazard" />
          <h2 className="text-4xl font-extrabold uppercase leading-[1.05]">
            Satu barcode,
            <br />
            <span className="text-primary">satu kebenaran</span> stok.
          </h2>
          <p className="mt-5 text-sm text-ink-foreground/65">
            Setiap penerimaan, pengeluaran, dan perubahan kondisi kemasan tercatat
            lengkap dengan petugas dan waktunya.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-px bg-ink-foreground/10">
            {[
              ["13.357", "pcs tercatat"],
              ["8 tipe", "kemasan"],
              ["100%", "terjejak"],
            ].map(([v, l]) => (
              <div key={l} className="bg-ink px-4 py-4">
                <dd className="numeric text-2xl font-extrabold">{v}</dd>
                <dt className="label-caps mt-1 text-ink-foreground/50">{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        <img src={polytron.url} alt="Polytron" className="relative h-6 w-auto" />
      </aside>

      <main className="flex flex-col justify-center bg-background px-6 py-14 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <img src={polytron.url} alt="Polytron" className="h-6 w-auto lg:hidden" />

          <h1 className="mt-8 text-3xl font-extrabold uppercase lg:mt-0">Masuk</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Gunakan akun petugas gudang Anda untuk melanjutkan.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label htmlFor="email" className="label-caps text-muted-foreground">
                Email / NIK
              </label>
              <input
                id="email"
                type="text"
                placeholder="nama@polytron.co.id"
                className="mt-2 w-full border border-input bg-surface px-3.5 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="label-caps text-muted-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full border border-input bg-surface px-3.5 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="size-4 accent-[var(--primary)]" />
                Ingat perangkat ini
              </label>
              <a href="#" className="label-caps text-primary hover:underline">
                Lupa password
              </a>
            </div>

            <Link
              to="/"
              className="label-caps block bg-primary py-3.5 text-center text-primary-foreground shadow-hard-sm transition-transform hover:-translate-y-0.5"
            >
              Masuk ke sistem
            </Link>
          </form>

          <p className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground">
            Akses hanya untuk petugas terdaftar. Hubungi supervisor gudang untuk
            pendaftaran akun baru.
          </p>
        </div>
      </main>
    </div>
  );
}
