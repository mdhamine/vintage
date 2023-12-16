export const dynamic = "force-dynamic";

import { Product } from "@/app/api/product/model";
import { IProduct } from "@/data/products";
import ProductCard from "./ProductCard";
import { connectDB } from "@/app/api/_db/connectDB";
import { Suspense } from "react";

async function getProducts(): Promise<IProduct[]> {
  await connectDB();

  // code fake 10 second waiting using set timeout
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const products = await Product.find({}).sort({ createdAt: "asc" });

  return JSON.parse(JSON.stringify(products));
}

export const ProductsContainer = async () => {
  const data = await getProducts();

  return (
    <>
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
