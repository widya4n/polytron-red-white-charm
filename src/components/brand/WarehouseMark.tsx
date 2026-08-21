type Props = {
  className?: string;
};

/**
 * Warehouse mark — atap gudang + palet, dibangun dari bentuk geometris tegas.
 * Merah untuk atap, hitam untuk struktur.
 */
export function WarehouseMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="44" height="44" rx="3" fill="currentColor" />
      {/* atap */}
      <path d="M9 20 24 10l15 10v3H9v-3Z" className="fill-primary" />
      {/* dinding */}
      <rect x="9" y="25" width="30" height="4" className="fill-ink-foreground" />
      {/* rak / palet */}
      <rect x="9" y="31" width="13" height="3.5" className="fill-ink-foreground" opacity="0.85" />
      <rect x="26" y="31" width="13" height="3.5" className="fill-ink-foreground" opacity="0.55" />
      <rect x="9" y="36.5" width="30" height="3.5" className="fill-primary" />
    </svg>
  );
}

export function WarehouseLogo({
  className,
  subtitle = "Warehouse System",
}: {
  className?: string;
  subtitle?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <WarehouseMark className="h-10 w-10 shrink-0 text-ink" />
      <div className="leading-none">
        <div className="font-display text-[1.05rem] font-extrabold tracking-tight text-foreground">
          POLYTRON
          <span className="ml-1.5 inline-block h-2 w-2 translate-y-[-1px] bg-primary" />
        </div>
        <div className="label-caps mt-1 text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
}
