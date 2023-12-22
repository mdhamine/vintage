export const dynamic = "force-dynamic";

import { Product } from "@/app/api/product/model";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductInfo } from "../components/ProductInfo";
import { connectDB } from "@/app/api/_db/connectDB";

async function getProductById(productId: string) {
  await connectDB();
  // await new Promise((res) => setTimeout(() => res(1), 10_000_000));
  const product = await Product.findOne({ slug: productId }).sort({
    createdAt: "asc",
  });

  // write code to wait 5 seconds

  return JSON.parse(JSON.stringify(product));
}

export default async function ProductsDetail({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

  if (!product) {
    return redirect("/products");
  }

  return (
    <>
      <Link href="/products">
        <span className="inline-flex items-center text-sm py-1 px-1.5 space-x-1 font-semibold rounded-lg bg-brand-secondary/20">
          <span>
            <ChevronLeft size={20} />
          </span>
          <span>
            Back
            {/* رجوع */}
          </span>
        </span>
      </Link>
      <ProductInfo product={product} />
    </>
  );
}
