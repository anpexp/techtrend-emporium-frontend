import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/** Domain model kept tiny and UI-agnostic */
export type FavoriteID = string | number;

type Ctx = {
  items: FavoriteID[];                     // IDs of favorited products
  isFavorite: (id: FavoriteID) => boolean; // Helper for cards
  toggle: (id: FavoriteID) => void;        // Add/Remove
  clear: () => void;                       // For QA / debugging
};

const FavoritesContext = createContext<Ctx | null>(null);

const LS_KEY = "tte_favorites_v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  // Load from localStorage once on mount
  const [items, setItems] = useState<FavoriteID[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as FavoriteID[]) : [];
    } catch {
      return [];
    }
  });

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // Toggle add/remove
  const toggle = useCallback((id: FavoriteID) => {
    setItems(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  }, []);

  const isFavorite = useCallback((id: FavoriteID) => items.includes(id), [items]);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({ items, isFavorite, toggle, clear }), [items, isFavorite, toggle, clear]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
