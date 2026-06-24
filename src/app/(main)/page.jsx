import ProductCard from "@/components/shared/ProductCard";

export default async function Home() {
    const res = await fetch("https://json.shahriyar.dev/anjuman-yeasmeen/product", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    const products = Array.isArray(data) ? data : data.models || [];
    const popularProducts = products.slice(0, 3);

    return (
      <div className="space-y-16 pb-16">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-orange-100 overflow-hidden">
          <div className="text-center z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-orange-600 mb-4 uppercase tracking-tighter">
              Summer Sale 50% OFF
            </h1>
            <p className="text-lg md:text-2xl text-orange-800 font-medium mb-6">
              Stay cool with our premium summer essentials! Hot Deals 🔥
            </p>
            <button className="btn bg-orange-600 hover:bg-orange-700 text-white border-none px-8 rounded-full">
              Shop Now
            </button>
          </div>
        </section>

        {/* Popular Products Section */}
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 border-l-4 border-orange-500 pl-4">
            <h2 className="text-3xl font-bold text-gray-800">🔥 Popular Products</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.length > 0 ? (
              popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full py-10 text-gray-500">
                No products found. Please check your JSON data.
              </p>
            )}
          </div>
        </section>

        {/* Summer Care Tips Section */}
        <section className="bg-orange-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">☀️ Summer Care Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-white p-6 shadow-md border-b-4 border-orange-400">
                <h3 className="font-bold text-xl mb-2 text-orange-600">Stay Hydrated 💧</h3>
                <p className="text-gray-600">Drink at least 8-10 glasses of water daily to keep your body cool.</p>
              </div>
              <div className="card bg-white p-6 shadow-md border-b-4 border-orange-400">
                <h3 className="font-bold text-xl mb-2 text-orange-600">Skin Protection 🧴</h3>
                <p className="text-gray-600">Always apply SPF 50+ sunscreen before heading out in the sun.</p>
              </div>
              <div className="card bg-white p-6 shadow-md border-b-4 border-orange-400">
                <h3 className="font-bold text-xl mb-2 text-orange-600">Wear Light Clothes 👕</h3>
                <p className="text-gray-600">Choose breathable fabrics like linen and cotton for maximum comfort.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Brands Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">🏆 Top Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["SunShade", "IslandStyle", "AquaCool", "SkinGuard"].map((brand) => (
              <div key={brand} className="flex items-center justify-center p-8 bg-gray-100 rounded-lg grayscale hover:grayscale-0 transition-all cursor-pointer border border-gray-200">
                <span className="text-xl font-black text-gray-400 uppercase tracking-widest">{brand}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
}