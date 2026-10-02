import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, HardHat, ClipboardCheck, Truck, ArrowRight, Search, MessageCircle } from "lucide-react";
import hero from "@/assets/hero.jpg";
import interior from "@/assets/interior.jpg";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { PriceNotice } from "@/components/PageHero";
import { SERVICES } from "@/lib/services";
import { whatsappLink } from "@/lib/site";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jenga Na Mwakibe — Building Materials & Construction Solutions" },
      { name: "description", content: "Browse cement, steel, roofing, timber, finishes and more. Send a material request and Jenga Na Mwakibe confirms pricing and delivery." },
      { property: "og:title", content: "Jenga Na Mwakibe — Your Project. Our Business" },
      { property: "og:description", content: "Quality construction materials and professional solutions in Kenya. Request materials online in minutes." },
    ],
  }),
  component: Index,
});

const TRUST = [
  { icon: ShieldCheck, t: "Quality Materials", d: "Trusted brands and graded materials for lasting builds." },
  { icon: HardHat, t: "Construction Solutions", d: "From gypsum and roofing to renovation and painting." },
  { icon: ClipboardCheck, t: "Convenient Ordering", d: "Pick materials, add quantities and send one request." },
  { icon: Truck, t: "Delivery Support", d: "We coordinate delivery straight to your site." },
];

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <section className="relative overflow-hidden bg-navy">
        <img src={hero} alt="Modern Kenyan home under construction" width={1600} height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Building materials • Construction solutions • Interior finishes
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[1.05] text-navy-foreground md:text-6xl">
            Build Better. Build With <span className="text-primary">Jenga Na Mwakibe.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-navy-foreground/80">
            Quality construction materials and professional solutions for your next project. Tell us what you need and our team will help you with availability, pricing and delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/materials" className="btn btn-primary">Browse Materials <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/request" className="btn btn-ghost-light">Request Materials</Link>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/materials", search: { q } }); }}
            className="mt-10 flex max-w-xl overflow-hidden rounded-xl bg-background shadow-card"
          >
            <Search className="ml-4 h-5 w-5 self-center text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search building materials..."
              className="flex-1 bg-transparent px-3 py-4 outline-none" />
            <button className="btn btn-navy m-1.5">Search</button>
          </form>
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="mx-auto grid max-w-7xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(({ icon: I, t, d }) => (
            <div key={t} className="flex gap-4 bg-background p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-sky text-navy"><I className="h-5 w-5" /></span>
              <div><p className="font-display font-bold text-navy">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="blueprint bg-sky">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Materials catalogue</p>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Shop by category</h2>
            </div>
            <Link to="/materials" className="font-bold text-navy underline-offset-4 hover:underline">View all materials →</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to="/materials" search={{ category: c.slug }}
                className="group overflow-hidden rounded-xl bg-background shadow-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.image} alt={c.name} loading="lazy" width={944} height={704}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="p-3 text-sm font-bold text-navy">{c.name}</p>
              </Link>
            ))}
            <Link to="/request" className="flex flex-col justify-between rounded-xl bg-navy p-5 text-navy-foreground shadow-card">
              <ClipboardCheck className="h-8 w-8 text-primary" />
              <p className="font-display text-lg font-bold">Can't find it? Tell us in your request.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="eyebrow">Popular materials</p>
        <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Most requested this season</h2>
        <PriceNotice className="mt-6" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => ["cement", "machine-cut-stones", "d12", "roofing-sheets", "river-sand", "gypsum-boards", "paint", "floor-tiles"].includes(p.id))
            .map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <img src={interior} alt="Gypsum ceiling and interior finishes" loading="lazy" width={1200} height={912} className="rounded-2xl" />
          <div>
            <p className="eyebrow">Our services</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-foreground md:text-4xl">More than materials</h2>
            <p className="mt-3 text-navy-foreground/75">Our team also designs, supplies and installs — from ceilings to roofs.</p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <li key={s.title} className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />{s.title}
                </li>
              ))}
            </ul>
            <Link to="/services" className="btn btn-primary mt-8">Explore services <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-sky p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-3xl font-extrabold">Ready to start your project?</h2>
            <p className="mt-2 text-muted-foreground">Send your list now — we'll come back with availability, pricing and delivery.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/request" className="btn btn-navy">Request Materials</Link>
            <a href={whatsappLink("Hello Jenga Na Mwakibe, I'd like to enquire about materials.")} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
