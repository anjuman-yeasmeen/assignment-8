import ProductCard from "@/components/shared/ProductCard";
// লোকাল JSON ফাইল থেকে প্রোডাক্ট ডাটা — root-এর product.json
import productData from "../../../../product.json";

export const metadata = {
    title: "Products | HeatWave",
    description: "Browse our summer essentials collection",
};

const ProductsPage = () => {
    const products = productData.models || [];

    return (
        <div className="pb-16">
            {/* Page Header */}
            <section className="bg-gradient-to-r from-orange-100 to-amber-100 py-14">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 uppercase tracking-tighter mb-3">
                        Our Collection
                    </h1>
                    <p className="text-orange-800/80 font-medium max-w-xl mx-auto">
                        Explore {products.length} premium summer essentials hand-picked to keep you cool ☀️
                    </p>
                </div>
            </section>

            {/* Product Grid */}
            <section className="container mx-auto px-4 mt-12">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-20 text-gray-500">
                        No products found. Please check your JSON data.
                    </p>
                )}
            </section>
        </div>
    );
};

export default ProductsPage;
