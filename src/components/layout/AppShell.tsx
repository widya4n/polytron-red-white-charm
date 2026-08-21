import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { WarehouseMark } from "@/components/brand/WarehouseMark";
import polytron from "@/assets/polytron.png.asset.json";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/incoming", label: "Transaksi Masuk" },
  { to: "/outgoing", label: "Transaksi Keluar" },
  { to: "/suppliers", label: "Suppliers" },
  { to: "/packaging", label: "Tipe Kemasan" },
  { to: "/barcode", label: "Kelola Barcode" },
  { to: "/audit", label: "Audit Trail" },
] as const;

export function AppShell({
  title,
  meta,
  action,
  children,
}: {
  title: string;
  meta?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-1.5 bg-hazard" />

      <header className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <WarehouseMark className="h-9 w-9 text-ink-muted" />
            <span className="hidden leading-none sm:block">
              <span className="block font-display text-sm font-extrabold tracking-tight">
                WAREHOUSE
              </span>
              <span className="label-caps block text-primary">Polytron</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{
                  className:
                    "bg-primary text-primary-foreground border-primary",
                }}
                inactiveProps={{
                  className:
                    "border-transparent text-ink-foreground/65 hover:text-ink-foreground hover:border-ink-foreground/25",
                }}
                className="label-caps border-b-2 px-3 py-2 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-4">
            <img
              src={polytron.url}
              alt="Polytron"
              className="hidden h-4 w-auto brightness-0 invert-0 md:block"
              style={{ filter: "none" }}
            />
            <div className="flex items-center gap-2 border-l border-ink-foreground/15 pl-3">
              <span className="grid h-8 w-8 place-items-center bg-primary font-display text-xs font-bold text-primary-foreground">
                AU
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-xs font-semibold">Admin Utama</span>
                <span className="label-caps block text-ink-foreground/50">
                  Supervisor
                </span>
              </span>
            </div>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-ink-foreground/10 px-4 py-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              inactiveProps={{ className: "text-ink-foreground/60" }}
              className="label-caps whitespace-nowrap px-3 py-1.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-5 py-6">
          <div>
            <h1 className="text-2xl font-extrabold uppercase sm:text-3xl">
              {title}
            </h1>
            {meta ? (
              <p className="label-caps mt-1.5 text-muted-foreground">{meta}</p>
            ) : null}
          </div>
          {action}
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-5 py-8">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-6">
          <img src={polytron.url} alt="Polytron" className="h-5 w-auto" />
          <p className="label-caps text-muted-foreground">
            © 2026 Polytron Warehouse System
          </p>
        </div>
      </footer>
    </div>
  );
}

export function Panel({
  title,
  right,
  children,
  className,
}: {
  title: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`border border-border bg-surface shadow-panel ${className ?? ""}`}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <h2 className="label-caps text-foreground">{title}</h2>
        {right}
      </header>
      {children}
    </section>
  );
}

export function KondisiTag({ value }: { value: string }) {
  const tone =
    value === "Good"
      ? "border-[var(--ok)] text-[var(--ok)]"
      : value === "Rusak"
        ? "border-primary text-primary"
        : "border-[var(--warn)] text-[var(--warn)]";
  return (
    <span className={`label-caps border px-2 py-0.5 ${tone}`}>{value}</span>
  );
}
