import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Facebook } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SITE, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Jenga Na Mwakibe" },
      { name: "description", content: "Call, WhatsApp or email Jenga Na Mwakibe for construction materials and services." },
      { property: "og:title", content: "Contact Jenga Na Mwakibe" },
      { property: "og:description", content: "Reach our team by phone, WhatsApp or email." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Phone, t: "Phone", v: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` },
    { icon: MessageCircle, t: "WhatsApp", v: "Chat with us", href: whatsappLink("Hello Jenga Na Mwakibe") },
    { icon: Mail, t: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Facebook, t: "Facebook", v: SITE.name, href: SITE.facebook },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your project">
        Reach us by phone, WhatsApp or email — we respond quickly during business hours.
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: I, t, v, href }) => (
          <a key={t} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
            className="rounded-xl border bg-card p-6 shadow-card transition hover:-translate-y-0.5">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-sky text-navy"><I className="h-6 w-6" /></span>
            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-primary">{t}</p>
            <p className="mt-1 break-words font-display text-lg font-bold text-navy">{v}</p>
          </a>
        ))}
      </section>
    </>
  );
}
