"use client"; 

import Link from "next/link";

const ProductCard = ({ product }) => {
  console.log(product)
  return (
    <div className="card bg-base-100 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <figure className="px-4 pt-4">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl h-48 w-full object-cover"
          // onError={(e) => {
          //   e.target.src = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop";
          // }}
        />
      </figure>
      <div className="card-body flex flex-col justify-between p-5">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h2 className="card-title text-base font-bold text-gray-800 line-clamp-2">{product.name}</h2>
            <div className="badge badge-secondary p-3 flex-shrink-0">⭐ {product.rating}</div>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-1">{product.brand}</p>
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">{product.description}</p>
        </div>
        
        <div className="card-actions justify-between items-center mt-5 pt-3 border-t border-gray-100">
          <span className="text-xl font-bold text-orange-600">${product.price}</span>
          <Link 
            href={`/products/${product.id || product._id}`} 
            className="btn bg-orange-500 hover:bg-orange-600 text-white border-none btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;