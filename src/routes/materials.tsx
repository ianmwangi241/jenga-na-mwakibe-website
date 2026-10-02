import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS, categoryName } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { PageHero, PriceNotice } from "@/components/PageHero";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute("/materials")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Building Materials Catalogue — Jenga Na Mwakibe" },
      { name: "description", content: "Browse cement, aggregates, steel, roofing, timber, plumbing, electrical, finishes and hardware. Add to your request — prices confirmed after." },
      { property: "og:title", content: "Building Materials Catalogue — Jenga Na Mwakibe" },
      { property: "og:description", content: "Find the construction materials you need and send one simple request." },
    ],
  }),
  component: Materials,
});

function Materials() {
  const { q = "", category } = Route.useSearch();
  const navigate = useNavigate({ from: "/materials" });
  const term = q.trim().toLowerCase();
  const list = PRODUCTS.filter((p) => {
    if (category && p.category !== category) return false;
    if (!term) return true;
    return [p.name, p.description, categoryName(p.category)].join(" ").toLowerCase().includes(term);
  });

  const set = (patch: { q?: string; category?: string }) =>
    navigate({ search: (s) => ({ ...s, ...patch }), replace: true });

  return (
    <>
      <PageHero eyebrow="Materials" title="Building materials catalogue">
        Select materials and quantities, then send your request. Our team confirms availability, current pricing and delivery.
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="sticky top-20 z-30 -mx-4 bg-background/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center overflow-hidden rounded-xl border shadow-card">
            <Search className="ml-4 h-5 w-5 text-muted-foreground" />
            <input value={q} onChange={(e) => set({ q: e.target.value || undefined })}
              placeholder="Search building materials..." className="flex-1 bg-transparent px-3 py-3.5 outline-none" />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <Chip active={!category} onClick={() => set({ category: undefined })}>All</Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c.slug} active={category === c.slug} onClick={() => set({ category: c.slug })}>{c.name}</Chip>
            ))}
          </div>
        </div>
        <PriceNotice className="mt-4" />
        <p className="mt-6 text-sm text-muted-foreground">{list.length} material{list.length === 1 ? "" : "s"}</p>
        {list.length === 0 ? (
          <div className="mt-6 rounded-xl bg-sky p-10 text-center">
            <p className="font-display text-xl font-bold text-navy">No materials match your search.</p>
            <p className="mt-2 text-muted-foreground">You can still describe what you need in the notes of your request.</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? "border-navy bg-navy text-navy-foreground" : "bg-background text-navy hover:bg-sky"}`}>
      {children}
    </button>
  );
}
