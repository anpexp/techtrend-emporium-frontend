import ProductCard, { type ProductLike } from "../components/molecules/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

function lookupProducts(ids: (string | number)[]): ProductLike[] {
  // Si no tienes API para buscar por id, usamos fallback con Picsum
  return ids.map((id) => ({
    id,
    name: `Product ${id}`,
    price: 0,
    imageUrl: `https://picsum.photos/seed/${id}/800/600`,
  }));
}

export default function FavoritesPage() {
  const { items, clear } = useFavorites();
  const products = lookupProducts(items);
  const hasItems = products.length > 0;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Favorites</h1>
        {hasItems && (
          <button onClick={clear} className="text-sm underline underline-offset-4">
            Clear all
          </button>
        )}
      </div>

      {!hasItems ? (
        <div className="rounded-xl border p-10 text-center bg-white">
          <p className="text-lg font-medium">Your favorites list is empty.</p>
          <p className="text-gray-600 mt-1">Browse products and tap the heart to add them here.</p>
          <a href="/" className="inline-block mt-6 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">
            Go to Home
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
