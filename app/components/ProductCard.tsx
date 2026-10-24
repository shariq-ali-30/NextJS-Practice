import { Star } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  discountPercentage: number;
  category: string;
}

interface ProductCardProp {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProp) => {
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Product Image */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-50 p-6">
        <span className="absolute left-4 top-4 z-10 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
          {product.discountPercentage}% OFF
        </span>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {product.category}
          </span>

          <span className="flex items-center gap-1 text-sm font-medium text-gray-600">
            <Star size={18} className="text-amber-400 fill-amber-400" />
            {product.rating}
          </span>
        </div>

        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {product.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          Get voluminous, longer-looking lashes with this long-lasting mascara.
        </p>

        {/* Price & Stock */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                ${product.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            </div>
          </div>

          <span className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
