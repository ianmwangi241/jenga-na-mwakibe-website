import { useState } from "react";
import { Check, Plus, Minus } from "lucide-react";
import { categoryName, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add, lines } = useCart();
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState(false);
  const inCart = lines.find((l) => l.id === product.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="aspect-[4/3] overflow-hidden bg-sky">
        <img src={product.image} alt={product.name} loading="lazy" width={944} height={704}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{categoryName(product.category)}</p>
        <h3 className="mt-1 text-lg font-bold">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-2 text-sm font-semibold text-navy">Unit: {product.unit}</p>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <div className="flex items-center rounded-md border">
            <button aria-label="Decrease" className="p-2.5" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></button>
            <input aria-label="Quantity" type="number" min={1} value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="w-12 bg-transparent text-center font-semibold outline-none" />
            <button aria-label="Increase" className="p-2.5" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></button>
          </div>
          <button
            className="btn btn-primary flex-1 px-3"
            onClick={() => { add(product.id, qty); setQty(1); setFlash(true); setTimeout(() => setFlash(false), 1400); }}
          >
            {flash ? <><Check className="h-4 w-4" />Added</> : "Add to Request"}
          </button>
        </div>
        {inCart && <p className="mt-2 text-xs font-semibold text-muted-foreground">{inCart.qty} in your request</p>}
      </div>
    </article>
  );
}
