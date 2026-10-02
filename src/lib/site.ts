export const SITE = {
  name: "Jenga Na Mwakibe",
  tagline: "Your Project. Our Business",
  phoneDisplay: "+254 724 112 802",
  phoneTel: "+254724112802",
  whatsapp: "254724112802",
  email: "jenganamwakibe@gmail.com",
  facebook: "https://www.facebook.com/search/top?q=Jenga%20Na%20Mwakibe",
  priceNote:
    "Prices are confirmed after your material request because market prices and availability may change.",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
