export const dynamic = "force-dynamic";

import { Product } from "@/app/api/product/model";
import { IProduct } from "@/data/products";
import ProductCard from "./components/ProductCard";
import { connectDB } from "@/app/api/_db/connectDB";
import { Suspense } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

async function getProducts(): Promise<IProduct[]> {
  await connectDB();

  // code fake 10 second waiting using set timeout
  // await new Promise((resolve) => setTimeout(resolve, 60000));

  const products = await Product.find({}).sort({ createdAt: "asc" });

  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
