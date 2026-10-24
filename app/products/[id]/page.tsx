import { Star, Tag, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

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

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const response = await fetch(`https://dummyjson.com/products/${id}`);

  if (!response.ok) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>
      </div>
    );
  }

  const product: Product = await response.json();

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to products
        </Link>

        {/* Product Details Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative flex min-h-[320px] items-center justify-center bg-gray-50 p-8 sm:min-h-[450px] sm:p-12">
              <span className="absolute left-5 top-5 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white">
                {product.discountPercentage.toFixed(0)}% OFF
              </span>

              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-64 w-full object-contain sm:h-80"
              />
            </div>

            {/* Product Information */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {product.category}
                </span>

                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  {product.rating.toFixed(1)}
                  <span className="text-gray-400">/ 5</span>
                </span>
              </div>

              {/* Title & Description */}
              <h1 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="text-sm font-medium text-gray-400">Price</p>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-bold tracking-tight text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>

                  <span className="text-base text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>

                  <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                    Save {product.discountPercentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Availability */}
              <div className="mt-6 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-emerald-600">
                  Product available
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold cursor-pointer text-white transition hover:bg-gray-700">
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Product Description
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Product ID
              </p>
              <p className="mt-1 font-semibold text-gray-800">#{product.id}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Category
              </p>
              <p className="mt-1 font-semibold capitalize text-gray-800">
                {product.category.replace(/-/g, " ")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
