import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Jenga Na Mwakibe — Your Project. Our Business" },
      { name: "description", content: "Jenga Na Mwakibe supplies construction materials and delivers construction solutions for homeowners, contractors and developers in Kenya." },
      { property: "og:title", content: "About Jenga Na Mwakibe" },
      { property: "og:description", content: "A Kenyan construction materials and solutions company. Your Project. Our Business." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Your Project. Our Business." />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 lg:grid-cols-2">
        <div className="space-y-4 text-lg text-muted-foreground">
          <p><strong className="text-navy">Jenga Na Mwakibe</strong> is a Kenyan construction and building-materials company serving homeowners, contractors and developers.</p>
          <p>We supply the materials that go into every stage of a build — from foundations and walling to roofing, plumbing, electrical and finishes — and we back that with practical construction services including gypsum, interior design, renovation, flooring and painting.</p>
          <p>Because material prices move quickly, we confirm every price at the time of your request, so you always get an honest, current quotation.</p>
          <Link to="/contact" className="btn btn-navy mt-2">Talk to our team</Link>
        </div>
        <img src={hero} alt="Construction site with building materials" loading="lazy" width={1600} height={1008} className="rounded-2xl shadow-card" />
      </section>
    </>
  );
}
