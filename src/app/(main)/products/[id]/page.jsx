import React from 'react';

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;

   
    const res = await fetch(`http://localhost:8000/models/${id}`, {
        cache: "no-store",
    });
    const product = await res.json();

    if (!product.id) {
        return <div className="text-center py-20">Product not found!</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                <div>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full rounded-2xl shadow-lg object-cover h-[400px]" 
                    />
                </div>

                
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
                    <div className="badge badge-secondary">{product.category}</div>
                    <p className="text-2xl font-semibold text-orange-600">${product.price}</p>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    
                    <div className="pt-4">
                        <p className="text-sm text-gray-500 mb-2">Availability: <span className="font-bold">{product.stock} in stock</span></p>
                        <button className="btn bg-orange-600 hover:bg-orange-700 text-white w-full md:w-auto px-10">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;