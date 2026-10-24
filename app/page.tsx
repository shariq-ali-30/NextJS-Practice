import Link from "next/link";
import ProductCard from "./components/ProductCard";

export const instant = false;

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

interface ProductsResponse {
  products: Product[];
}

export default async function Home() {
  const response = await fetch(`https://dummyjson.com/products`);
  const { products }: ProductsResponse = await response.json();

  return (
    <>
      <div className="min-h-screen max-w-screen flex flex-wrap justify-center gap-4 sm:gap-8 p-3 sm:p-6">
        {products.map((product) => (
          <Link href={`products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  );
}
