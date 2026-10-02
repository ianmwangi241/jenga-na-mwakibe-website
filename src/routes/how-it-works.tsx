import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, PriceNotice } from "@/components/PageHero";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Material Requests Work — Jenga Na Mwakibe" },
      { name: "description", content: "Find materials, add quantities, share your site location and submit. Jenga Na Mwakibe confirms pricing and delivery." },
      { property: "og:title", content: "How It Works — Jenga Na Mwakibe" },
      { property: "og:description", content: "Request construction materials in a few minutes from your phone." },
    ],
  }),
  component: How,
});

const STEPS = [
  ["Find materials", "Browse the catalogue or search for what your project needs."],
  ["Select quantities", "Add each material to your request with the quantity you need."],
  ["Enter your details", "Share your name, phone number and email."],
  ["Share your site location", "County, town, estate, road and a nearby landmark help us deliver."],
  ["Submit your request", "Review everything and submit — you get a request number instantly."],
  ["We confirm pricing", "Our team contacts you with availability, current prices and delivery."],
];

function How() {
  return (
    <>
      <PageHero eyebrow="How it works" title="From material list to delivery, simply">
        No online payment, no guesswork. You tell us what you need — we take it from there.
      </PageHero>
      <section className="mx-auto max-w-4xl px-4 py-14">
        <ol className="space-y-4">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="flex gap-5 rounded-xl border bg-card p-5 shadow-card">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-display text-lg font-bold text-navy-foreground">{i + 1}</span>
              <div><h3 className="text-lg font-bold">{t}</h3><p className="mt-1 text-muted-foreground">{d}</p></div>
            </li>
          ))}
        </ol>
        <PriceNotice className="mt-8" />
        <div className="mt-8 flex gap-3">
          <Link to="/materials" className="btn btn-primary">Browse Materials</Link>
          <Link to="/request" className="btn btn-outline">Request Materials</Link>
        </div>
      </section>
    </>
  );
}
