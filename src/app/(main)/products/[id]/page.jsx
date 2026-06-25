import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
// লোকাল JSON ফাইল থেকে প্রোডাক্ট ডাটা — root-এর product.json (লিস্ট পেজের মতোই)
import productData from "../../../../../product.json";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;

  // Protected Route: শুধু লগইন করা ইউজার দেখতে পারবে।
  // লগইন না থাকলে callbackUrl সহ লগইন পেজে পাঠানো হয়, যাতে লগইনের পর এখানেই ফিরে আসে।
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/login?callbackUrl=/products/${id}`);
  }

  const product = (productData.models || []).find((item) => String(item.id) === String(id));

  // প্রোডাক্ট না পাওয়া গেলে থিম-ম্যাচিং মেসেজ
  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">🏝️</span>
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found!</h2>
        <p className="text-gray-500 text-sm mt-2 mb-6">
          The summer essential you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/products"
          className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-2xl"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 min-h-screen py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6 text-gray-500">
          <ul>
            <li>
              <Link href="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-orange-500">
                Products
              </Link>
            </li>
            <li className="text-orange-600 font-medium">{product.name}</li>
          </ul>
        </div>

        {/* Main Product Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/85 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-orange-100">
          {/* Left: Image */}
          <div className="flex justify-center items-center bg-orange-50/60 rounded-2xl p-4 overflow-hidden group min-h-[360px] md:min-h-[460px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[420px] w-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category + Rating */}
              <div className="flex justify-between items-center mb-4">
                <span className="badge bg-orange-100 text-orange-700 font-semibold border-none px-3 py-3 text-xs uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="badge badge-secondary gap-1 p-3 font-bold">⭐ {product.rating}</div>
              </div>

              {/* Name + Brand */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-gray-400 font-medium mb-5">
                Brand: <span className="text-gray-600 font-semibold">{product.brand}</span>
              </p>

              {/* Price */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl inline-block mb-6 border border-orange-100">
                <span className="text-xs text-gray-500 block font-medium uppercase tracking-wider">
                  Special Summer Price
                </span>
                <span className="text-4xl font-black text-orange-600">${product.price}</span>
              </div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-bold text-slate-800">Product Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Stock + Actions */}
            <div className="pt-6 border-t border-orange-100 space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Availability:</span>
                <span
                  className={`font-bold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
                >
                  {product.stock > 0 ? `${product.stock} items left in stock` : "Out of Stock"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="btn flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none font-bold text-lg h-12 rounded-2xl shadow-lg shadow-orange-500/20 transition-all disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400"
                  disabled={product.stock === 0}
                >
                  Add to Cart 🛒
                </button>
                <Link
                  href="/products"
                  className="btn btn-outline border-amber-200 text-slate-600 hover:bg-amber-50 px-6 h-12 font-bold rounded-2xl"
                >
                  Back to Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
