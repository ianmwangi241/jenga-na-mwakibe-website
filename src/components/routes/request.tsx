import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Minus, Plus, MessageCircle, Printer, CheckCircle2, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/catalog";
import { PageHero, PriceNotice } from "@/components/PageHero";
import { SITE, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request Materials — Jenga Na Mwakibe" },
      { name: "description", content: "Review your material list, add delivery details and send your request to Jenga Na Mwakibe." },
      { property: "og:title", content: "Request Materials — Jenga Na Mwakibe" },
      { property: "og:description", content: "Send your construction material request in minutes." },
    ],
  }),
  component: RequestPage,
});

const COUNTIES = ["Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita-Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];

type Form = {
  name: string; phone: string; email: string;
  county: string; town: string; estate: string; road: string; building: string; landmark: string; directions: string;
  mapLink: string; notes: string;
};
const empty: Form = { name: "", phone: "", email: "", county: "", town: "", estate: "", road: "", building: "", landmark: "", directions: "", mapLink: "", notes: "" };

type Item = { name: string; unit: string; qty: number };
type Order = { number: string; date: string; form: Form; items: Item[] };

function newOrderNumber() {
  const year = new Date().getFullYear();
  const n = Number(localStorage.getItem("jnm-seq") || "0") + 1;
  localStorage.setItem("jnm-seq", String(n));
  const suffix = String((Date.now() % 9000) + 1000 + n).slice(-6).padStart(6, "0");
  return `JNM-${year}-${suffix}`;
}

function buildMessage(o: Order) {
  const f = o.form;
  const loc = [["County", f.county], ["Town/Area", f.town], ["Estate/Village", f.estate], ["Street/Road", f.road], ["Building/Plot", f.building], ["Landmark", f.landmark], ["Directions", f.directions], ["Map", f.mapLink]]
    .filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  return [
    "JENGA NA MWAKIBE", "NEW MATERIAL REQUEST", "====================", "",
    `Order No: ${o.number}`, `Date: ${o.date}`, "",
    "CUSTOMER", `Name: ${f.name}`, `Phone: ${f.phone}`, f.email ? `Email: ${f.email}` : "", "",
    "DELIVERY LOCATION", loc, "",
    "MATERIALS REQUESTED", ...o.items.map((i) => `${i.qty} × ${i.name} — ${i.unit}`), "",
    f.notes ? `NOTES\n${f.notes}\n` : "",
    "PRICING: To be confirmed by Jenga Na Mwakibe.",
    "STATUS: Pending Confirmation",
  ].filter((l) => l !== "").join("\n").replace(/\n(CUSTOMER|DELIVERY|MATERIALS|NOTES|PRICING)/g, "\n\n$1");
}

function RequestPage() {
  const cart = useCart();
  const [step, setStep] = useState<"cart" | "details" | "review" | "done">("cart");
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [order, setOrder] = useState<Order | null>(null);
  const [locating, setLocating] = useState(false);

  const items: Item[] = cart.lines.map((l) => {
    const p = getProduct(l.id);
    return { name: p?.name ?? l.id, unit: p?.unit ?? "", qty: l.qty };
  });

  const upd = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^(\+?254|0)?[17]\d{8}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid Kenyan phone number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.county) e.county = "Select your county";
    if (!form.town.trim()) e.town = "Enter town or area";
    if (!form.landmark.trim()) e.landmark = "A nearby landmark helps us find your site";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setForm((f) => ({ ...f, mapLink: `https://maps.google.com/?q=${pos.coords.latitude.toFixed(6)},${pos.coords.longitude.toFixed(6)}` })); setLocating(false); },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const submit = () => {
    const o: Order = {
      number: newOrderNumber(),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      form, items,
    };
    setOrder(o);
    cart.clear();
    setStep("done");
    window.scrollTo({ top: 0 });
  };

  const go = (s: typeof step) => { setStep(s); window.scrollTo({ top: 0 }); };

  if (step === "done" && order) {
    const msg = buildMessage(order);
    return (
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border bg-card p-6 shadow-card md:p-10">
          <CheckCircle2 className="h-12 w-12 text-whatsapp" />
          <h1 className="mt-4 text-3xl font-extrabold">Request Submitted Successfully</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you for choosing Jenga Na Mwakibe. Your material request has been received. Our team will review your request and contact you regarding availability, current pricing and delivery.
          </p>
          <div className="mt-6 grid gap-3 rounded-xl bg-sky p-5 sm:grid-cols-3">
            <Info k="Request number" v={order.number} />
            <Info k="Date" v={order.date} />
            <Info k="Status" v="Pending Confirmation" />
          </div>
          <Summary order={order} />
          <div className="no-print mt-8 rounded-xl border-2 border-whatsapp/40 p-5">
            <p className="font-bold text-navy">Final step: send your request on WhatsApp</p>
            <p className="mt-1 text-sm text-muted-foreground">This sends the full request to our team so we can respond quickly.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" />Send on WhatsApp</a>
              <button onClick={() => window.print()} className="btn btn-outline"><Printer className="h-4 w-4" />Download / Print</button>
              <Link to="/materials" className="btn">Back to materials</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Material request" title={step === "cart" ? "Your material request" : step === "details" ? "Your details & site location" : "Review your request"} />
      <section className="mx-auto max-w-4xl px-4 py-10">
        <Steps step={step} />
        {step === "cart" && (
          <>
            {items.length === 0 ? (
              <div className="mt-8 rounded-xl bg-sky p-10 text-center">
                <p className="font-display text-xl font-bold text-navy">No materials selected</p>
                <p className="mt-2 text-muted-foreground">Browse the catalogue and add the materials your project needs.</p>
                <Link to="/materials" className="btn btn-navy mt-6">Browse Materials</Link>
              </div>
            ) : (
              <>
                <ul className="mt-8 divide-y rounded-xl border bg-card shadow-card">
                  {cart.lines.map((l) => {
                    const p = getProduct(l.id);
                    if (!p) return null;
                    return (
                      <li key={l.id} className="flex items-center gap-4 p-4">
                        <img src={p.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-navy">{p.name}</p>
                          <p className="text-sm text-muted-foreground">{p.unit}</p>
                        </div>
                        <div className="flex items-center rounded-md border">
                          <button aria-label="Decrease" className="p-2" onClick={() => cart.setQty(l.id, l.qty - 1)}><Minus className="h-4 w-4" /></button>
                          <input aria-label="Quantity" type="number" min={1} value={l.qty} onChange={(e) => cart.setQty(l.id, Number(e.target.value) || 1)} className="w-14 bg-transparent text-center font-semibold outline-none" />
                          <button aria-label="Increase" className="p-2" onClick={() => cart.setQty(l.id, l.qty + 1)}><Plus className="h-4 w-4" /></button>
                        </div>
                        <button aria-label="Remove" onClick={() => cart.remove(l.id)} className="p-2 text-brand-red"><Trash2 className="h-4 w-4" /></button>
                      </li>
                    );
                  })}
                </ul>
                <PriceNotice className="mt-6" />
                <div className="mt-6 flex flex-wrap justify-between gap-3">
                  <Link to="/materials" className="btn btn-outline">Add more materials</Link>
                  <button className="btn btn-navy" onClick={() => go("details")}>Continue</button>
                </div>
              </>
            )}
          </>
        )}

        {step === "details" && (
          <div className="mt-8 space-y-8">
            <Fieldset title="Personal information">
              <F label="Full name *" err={errors.name}><input className="field" value={form.name} onChange={upd("name")} autoComplete="name" /></F>
              <F label="Phone number *" err={errors.phone}><input className="field" value={form.phone} onChange={upd("phone")} placeholder="07XX XXX XXX" inputMode="tel" autoComplete="tel" /></F>
              <F label="Email (optional)" err={errors.email}><input className="field" value={form.email} onChange={upd("email")} type="email" autoComplete="email" /></F>
            </Fieldset>
            <Fieldset title="Delivery location">
              <F label="County *" err={errors.county}>
                <select className="field" value={form.county} onChange={upd("county")}>
                  <option value="">Select county</option>
                  {COUNTIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </F>
              <F label="Town / Area *" err={errors.town}><input className="field" value={form.town} onChange={upd("town")} placeholder="e.g. Ongata Rongai" /></F>
              <F label="Estate / Village"><input className="field" value={form.estate} onChange={upd("estate")} /></F>
              <F label="Street / Road"><input className="field" value={form.road} onChange={upd("road")} /></F>
              <F label="Building / Plot / Site"><input className="field" value={form.building} onChange={upd("building")} /></F>
              <F label="Nearby landmark *" err={errors.landmark}><input className="field" value={form.landmark} onChange={upd("landmark")} placeholder="e.g. Behind XYZ Supermarket" /></F>
              <div className="sm:col-span-2"><F label="Additional directions"><textarea className="field" rows={2} value={form.directions} onChange={upd("directions")} /></F></div>
              <div className="sm:col-span-2">
                <F label="Map location (optional)">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input className="field" value={form.mapLink} onChange={upd("mapLink")} placeholder="Paste a Google Maps link" />
                    <button type="button" onClick={useMyLocation} className="btn btn-outline shrink-0"><MapPin className="h-4 w-4" />{locating ? "Locating…" : "Use my location"}</button>
                  </div>
                </F>
              </div>
            </Fieldset>
            <Fieldset title="Additional requirements">
              <div className="sm:col-span-2"><F label="Notes"><textarea className="field" rows={3} value={form.notes} onChange={upd("notes")} placeholder="Other materials, preferred brands, delivery timing…" /></F></div>
            </Fieldset>
            <div className="flex justify-between gap-3">
              <button className="btn btn-outline" onClick={() => go("cart")}>Back</button>
              <button className="btn btn-navy" onClick={() => validate() && go("review")}>Review request</button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="mt-8 rounded-2xl border bg-card p-6 shadow-card">
            <Summary order={{ number: "", date: "", form, items }} />
            <div className="mt-6 rounded-lg bg-sky p-4"><p className="font-bold text-navy">Pricing</p><p className="text-sm text-muted-foreground">To be confirmed by {SITE.name}.</p></div>
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <button className="btn btn-outline" onClick={() => go("details")}>Edit request</button>
              <button className="btn btn-navy" onClick={submit}>Submit material request</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Steps({ step }: { step: string }) {
  const s = ["cart", "details", "review"];
  const labels = ["Materials", "Details", "Review"];
  const idx = s.indexOf(step);
  return (
    <ol className="flex gap-2">
      {labels.map((l, i) => (
        <li key={l} className={`flex-1 rounded-full py-2 text-center text-xs font-bold ${i <= idx ? "bg-navy text-navy-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}. {l}</li>
      ))}
    </ol>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border bg-card p-5 shadow-card">
      <legend className="px-2 font-display text-lg font-bold text-navy">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function F({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
      {children}
      {err && <span className="mt-1 block text-xs font-semibold text-brand-red">{err}</span>}
    </label>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{k}</p><p className="font-display font-bold text-navy">{v}</p></div>;
}

function Summary({ order }: { order: Order }) {
  const f = order.form;
  const loc = [f.county && `County: ${f.county}`, f.town && `Town: ${f.town}`, f.estate && `Estate: ${f.estate}`, f.road && `Road: ${f.road}`, f.building && `Building: ${f.building}`, f.landmark && `Landmark: ${f.landmark}`, f.directions && `Directions: ${f.directions}`].filter(Boolean);
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div>
        <p className="eyebrow">Customer</p>
        <p className="mt-2 font-bold text-navy">{f.name}</p>
        <p className="text-sm">{f.phone}</p>
        {f.email && <p className="text-sm">{f.email}</p>}
      </div>
      <div>
        <p className="eyebrow">Delivery location</p>
        <ul className="mt-2 space-y-0.5 text-sm">{loc.map((l) => <li key={l as string}>{l}</li>)}</ul>
        {f.mapLink && <a href={f.mapLink} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">View on map</a>}
      </div>
      <div className="md:col-span-2">
        <p className="eyebrow">Materials requested</p>
        <ul className="mt-2 divide-y rounded-lg border">
          {order.items.map((i) => (
            <li key={i.name} className="flex justify-between p-3 text-sm"><span className="font-semibold text-navy">{i.qty} × {i.name}</span><span className="text-muted-foreground">{i.unit}</span></li>
          ))}
        </ul>
      </div>
      {f.notes && <div className="md:col-span-2"><p className="eyebrow">Notes</p><p className="mt-2 text-sm">{f.notes}</p></div>}
    </div>
  );
}
