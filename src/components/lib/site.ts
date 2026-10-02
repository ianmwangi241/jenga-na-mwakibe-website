export const SITE = {
  name: "Jenga Na Mwakibe",
  tagline: "Your Project. Our Business",
  phoneDisplay: "+254 724 112 82",
  phoneTel: "+25472411282",
  whatsapp: "25472411282",
  email: "info@jenganamwakibe.co.ke",
  facebook: "https://www.facebook.com/search/top?q=Jenga%20Na%20Mwakibe",
  priceNote:
    "Prices are confirmed after your material request because market prices and availability may change.",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
