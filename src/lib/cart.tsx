import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartLine = { id: string; qty: number };
type Ctx = {
  lines: CartLine[];
  count: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "jnm-request-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = (id: string, qty = 1) =>
    setLines((l) => {
      const f = l.find((x) => x.id === id);
      return f ? l.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x)) : [...l, { id, qty }];
    });
  const setQty = (id: string, qty: number) =>
    setLines((l) => l.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  const remove = (id: string) => setLines((l) => l.filter((x) => x.id !== id));
  const clear = () => setLines([]);

  return (
    <CartContext.Provider value={{ lines, count: lines.length, add, setQty, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
