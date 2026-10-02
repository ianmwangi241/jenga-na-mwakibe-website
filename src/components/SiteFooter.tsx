import { Link } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Facebook } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { CATEGORIES } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="no-print bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-2xl font-extrabold tracking-tight">JENGA NA MWAKIBE</p>
          <p className="mt-1 text-sm italic text-primary">“{SITE.tagline}”</p>
          <p className="mt-4 text-sm opacity-75">
            Construction materials and construction solutions for homes, contractors and developers across Kenya.
          </p>
        </div>
        <div>
          <p className="mb-3 font-bold">Materials</p>
          <ul className="space-y-2 text-sm opacity-80">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to="/materials" search={{ category: c.slug }}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-bold">Company</p>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/request">Request Materials</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-bold">Get in touch</p>
          <ul className="space-y-3 text-sm opacity-90">
            <li><a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{SITE.phoneDisplay}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-primary" />WhatsApp us</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />{SITE.email}</a></li>
            <li><a href={SITE.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2"><Facebook className="h-4 w-4 text-primary" />{SITE.name}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}.
      </div>
    </footer>
  );
}
