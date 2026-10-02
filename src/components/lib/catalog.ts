import cement from "@/assets/cat-cement.jpg";
import aggregates from "@/assets/cat-aggregates.jpg";
import steel from "@/assets/cat-steel.jpg";
import roofing from "@/assets/cat-roofing.jpg";
import timber from "@/assets/cat-timber.jpg";
import plumbing from "@/assets/cat-plumbing.jpg";
import electrical from "@/assets/cat-electrical.jpg";
import finishes from "@/assets/cat-finishes.jpg";
import hardware from "@/assets/cat-hardware.jpg";

export type Category = { slug: string; name: string; image: string; items: string[] };
export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  unit: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "cement", name: "Cement & Building Materials", image: cement, items: ["Cement", "Building stones", "Machine-cut stones", "Blocks", "Bricks"] },
  { slug: "aggregates", name: "Aggregates", image: aggregates, items: ["Ballast", "Quarry dust", "Hardcore", "River sand", "Plaster sand"] },
  { slug: "steel", name: "Steel & Reinforcement", image: steel, items: ["Reinforcement bars", "Binding wire", "Steel sections", "Mesh"] },
  { slug: "roofing", name: "Roofing", image: roofing, items: ["Roofing sheets", "Tiles", "Ridge caps", "Gutters", "Accessories"] },
  { slug: "timber", name: "Timber", image: timber, items: ["Structural timber", "Hardwood", "Softwood", "Boards", "Plywood"] },
  { slug: "plumbing", name: "Plumbing", image: plumbing, items: ["Pipes", "Fittings", "Tanks", "Drainage"] },
  { slug: "electrical", name: "Electrical", image: electrical, items: ["Cables", "Switches", "Sockets", "Lighting"] },
  { slug: "finishes", name: "Finishes", image: finishes, items: ["Paint", "Tiles", "Flooring", "Gypsum", "Ceilings"] },
  { slug: "hardware", name: "Hardware", image: hardware, items: ["Nails", "Screws", "Tools", "General hardware"] },
];

const img = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!.image;
const p = (id: string, name: string, category: string, unit: string, description: string): Product => ({
  id, name, category, unit, description, image: img(category),
});

export const PRODUCTS: Product[] = [
  p("cement", "Cement", "cement", "50kg bag", "Ordinary Portland cement for concrete, plastering and masonry."),
  p("machine-cut-stones", "Machine Cut Stones", "cement", "Piece", "Uniform machine-dressed stones for clean, fast walling."),
  p("building-stones", "Building Stones", "cement", "Piece", "Hand-dressed natural building stones for foundations and walls."),
  p("concrete-blocks", "Concrete Blocks", "cement", "Piece", "Solid and hollow blocks for partitions and boundary walls."),
  p("river-sand", "River Sand", "aggregates", "Tonne", "Clean, washed river sand for concrete and masonry."),
  p("plaster-sand", "Plaster Sand", "aggregates", "Tonne", "Fine sieved sand for smooth plaster and render."),
  p("ballast", "Ballast", "aggregates", "Tonne", "Crushed stone aggregate for structural concrete."),
  p("quarry-dust", "Quarry Dust", "aggregates", "Tonne", "Fine crushed stone for blocks, paving and backfill."),
  p("hardcore", "Hardcore", "aggregates", "Tonne", "Large broken stone for foundations and sub-base."),
  p("d8", "D8 Reinforcement Bar", "steel", "12m length", "8mm deformed steel bar for slabs and stirrups."),
  p("d10", "D10 Reinforcement Bar", "steel", "12m length", "10mm deformed steel bar for beams and columns."),
  p("d12", "D12 Reinforcement Bar", "steel", "12m length", "12mm high-yield bar for structural reinforcement."),
  p("binding-wire", "Binding Wire", "steel", "25kg roll", "Annealed wire for tying reinforcement bars."),
  p("brc-mesh", "BRC Mesh", "steel", "Roll", "Welded mesh for slabs, floors and paving."),
  p("roofing-sheets", "Roofing Sheets", "roofing", "Sheet", "Pre-painted corrugated and box-profile sheets in various gauges."),
  p("ridge-caps", "Ridge Caps", "roofing", "Piece", "Matching ridge caps to seal roof peaks."),
  p("gutters", "Gutters", "roofing", "Length", "Rainwater gutters, downpipes and brackets."),
  p("structural-timber", "Structural Timber", "timber", "Running metre", "Treated cypress and pine for trusses and formwork."),
  p("plywood", "Plywood", "timber", "Sheet", "Marine and standard plywood boards."),
  p("pvc-pipes", "PVC Pipes", "plumbing", "6m length", "Pressure and waste PVC pipes in multiple diameters."),
  p("plumbing-fittings", "Plumbing Fittings", "plumbing", "Piece", "Elbows, tees, sockets, valves and adaptors."),
  p("water-tanks", "Water Tanks", "plumbing", "Piece", "Plastic water storage tanks from 500 to 10,000 litres."),
  p("electrical-cables", "Electrical Cables", "electrical", "100m roll", "Single and twin-core copper cables, 1.5mm to 6mm."),
  p("switches", "Switches", "electrical", "Piece", "One, two and three-gang light switches."),
  p("sockets", "Sockets", "electrical", "Piece", "Single and double switched power sockets."),
  p("led-lights", "LED Lights", "electrical", "Piece", "Energy-saving bulbs, downlights and panel lights."),
  p("gypsum-boards", "Gypsum Boards", "finishes", "Sheet", "9mm and 12mm boards for ceilings and partitions."),
  p("gypsum-accessories", "Gypsum Accessories", "finishes", "Piece", "Channels, studs, cornices and joint compound."),
  p("paint", "Paint", "finishes", "20L bucket", "Interior and exterior emulsion, gloss and undercoat."),
  p("floor-tiles", "Floor Tiles", "finishes", "Box", "Ceramic and porcelain floor tiles in many sizes."),
  p("wall-tiles", "Wall Tiles", "finishes", "Box", "Glazed wall tiles for kitchens and bathrooms."),
  p("nails", "Nails", "hardware", "Kg", "Wire, roofing and concrete nails in all sizes."),
  p("screws", "Screws", "hardware", "Box", "Wood, drywall and roofing screws."),
  p("general-hardware", "General Hardware", "hardware", "Piece", "Hinges, locks, tools and site accessories."),
];

export const categoryName = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
export const getProduct = (id: string) => PRODUCTS.find((x) => x.id === id);
