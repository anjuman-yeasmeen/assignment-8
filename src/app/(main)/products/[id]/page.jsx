import React from 'react';
import Link from 'next/link';

const ProductDetailsPage = async ({ params }) => {
    // ১. Next.js-এর নিয়ম অনুযায়ী params-কে await করে নিতে হবে
    const { id } = await params;

    try {
        // ২. id-কে সংখ্যায় (Number) রূপান্তর করে JSON Server থেকে ডাটা ফেচ করা হচ্ছে
        const res = await fetch(`https://json.shahriyar.dev/anjuman-yeasmeen/models/${Number(id)}`, {
            cache: "no-store",
        });

        // যদি ডাটা খুঁজে না পাওয়া যায়
        if (!res.ok) {
            return (
                <div className="text-center py-20 min-h-screen flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold text-gray-700">Product Not Found!</h2>
                    <Link href="/" className="btn btn-primary mt-4 btn-sm">Back to Home</Link>
                </div>
            );
        }

        const product = await res.json();

        return (
            <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
                {/* Breadcrumb - নেভিগেশনের সুবিধার জন্য */}
                <div className="text-sm breadcrumbs mb-6 text-gray-500">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/">Products</Link></li>
                        <li className="text-orange-600 font-medium">{product.name}</li>
                    </ul>
                </div>

                {/* Main Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-base-100 p-6 md:p-10 rounded-3xl shadow-xl border border-orange-50">
                    
                    {/* Left Side: Product Image */}
                    <div className="flex justify-center items-center bg-gray-50 rounded-2xl p-4 overflow-hidden group">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full max-h-[450px] object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                            
                        />
                    </div>

                    {/* Right Side: Product Details info */}
                    <div className="flex flex-col justify-between space-y-6">
                        <div>
                            {/* Category and Rating */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="badge bg-orange-100 text-orange-700 font-semibold border-none px-3 py-1 text-xs uppercase tracking-wider">
                                    {product.category}
                                </span>
                                <div className="badge badge-secondary gap-1 p-3 font-bold">
                                    ⭐ {product.rating}
                                </div>
                            </div>

                            {/* Product Name & Brand */}
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-sm text-gray-400 font-medium mb-4">
                                Brand: <span className="text-gray-600 font-semibold">{product.brand}</span>
                            </p>

                            {/* Price Tag */}
                            <div className="bg-orange-50/50 p-4 rounded-xl inline-block mb-6">
                                <span className="text-sm text-gray-500 block font-medium">Special Summer Price</span>
                                <span className="text-3xl font-black text-orange-600">${product.price}</span>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* Availability & Add to Cart Action */}
                        <div className="pt-6 border-t border-gray-100 space-y-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Availability:</span>
                                <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {product.stock > 0 ? `${product.stock} items left in stock` : 'Out of Stock'}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    className="btn bg-orange-500 hover:bg-orange-600 text-white flex-1 border-none font-bold text-lg h-12 shadow-md shadow-orange-200 transition-all duration-200"
                                    disabled={product.stock === 0}
                                >
                                    Add to Cart 🛒
                                </button>
                                <Link href="/" className="btn btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 px-6 h-12 font-bold">
                                    Back to Shop
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );

    } catch (error) {
        console.error("Error fetching product details:", error);
        return (
            <div className="text-center py-20 min-h-screen flex flex-col justify-center items-center">
                <h2 className="text-red-500 text-2xl font-bold">সার্ভার এরর! ডাটা লোড করা যায়নি।</h2>
                <p className="text-gray-500 text-sm mt-2">অনুগ্রহ করে নিশ্চিত করুন আপনার JSON Server (Port 8000) সচল আছে।</p>
                <Link href="/" className="btn bg-orange-500 text-white mt-6 btn-sm border-none">Try Refresh</Link>
            </div>
        );
    }
};

export default ProductDetailsPage;