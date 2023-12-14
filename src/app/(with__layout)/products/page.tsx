export const dynamic = "force-dynamic";

import { Product } from "@/app/api/product/model";
import { IProduct } from "@/data/products";
import ProductCard from "./components/ProductCard";
import { connectDB } from "@/app/api/_db/connectDB";

async function getProducts(): Promise<IProduct[]> {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: "asc" });

  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols3 lg:grid-cols-4 gap-4">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
