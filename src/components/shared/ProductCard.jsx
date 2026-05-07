import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
      <figure className="px-4 pt-4">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg font-bold text-gray-800">{product.name}</h2>
          <div className="badge badge-secondary p-3">⭐ {product.rating}</div>
        </div>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-2xl font-bold text-orange-600">${product.price}</span>
          {/* Protected route logic will handle the details click */}
          <Link href={`/products/${product.id}`} className="btn bg-orange-500 hover:bg-orange-600 text-white border-none btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;