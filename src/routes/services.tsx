import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SERVICES } from "@/lib/services";
import { whatsappLink } from "@/lib/site";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Construction Services — Jenga Na Mwakibe" },
      { name: "description", content: "Interior design, gypsum supply and installation, roofing, lighting, renovation, flooring and painting by Jenga Na Mwakibe." },
      { property: "og:title", content: "Construction Services — Jenga Na Mwakibe" },
      { property: "og:description", content: "Professional construction and interior finishing services across Kenya." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Construction solutions, start to finish">
        Beyond supplying materials, our team designs, installs and finishes — so your project is handled by one trusted partner.
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ title, icon: I, desc }) => (
            <div key={title} className="flex flex-col rounded-xl border bg-card p-6 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-sky text-navy"><I className="h-6 w-6" /></span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{desc}</p>
              <a href={whatsappLink(`Hello Jenga Na Mwakibe, I'd like to request a quote for: ${title}.`)} target="_blank" rel="noreferrer"
                className="mt-5 text-sm font-bold text-primary hover:underline">Request this service →</a>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-navy">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-navy-foreground">Planning a renovation or new build?</h2>
            <p className="mt-3 text-navy-foreground/75">Tell us about your project and we'll advise on materials, finishes and timelines.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={whatsappLink("Hello Jenga Na Mwakibe, I'd like to discuss a project.")} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" />Chat on WhatsApp</a>
              <Link to="/contact" className="btn btn-ghost-light">Contact us</Link>
            </div>
          </div>
          <img src={interior} alt="Finished interior with gypsum ceiling" loading="lazy" width={1200} height={912} className="rounded-2xl" />
        </div>
      </section>
    </>
  );
}
