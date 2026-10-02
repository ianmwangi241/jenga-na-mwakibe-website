import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="blueprint bg-sky">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function PriceNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 rounded-lg border-l-4 border-brand-red bg-background p-4 text-sm text-navy shadow-card ${className}`}>
      <span className="font-bold">Note:</span>
      <span>Prices are confirmed after your material request because market prices and availability may change.</span>
    </div>
  );
}
