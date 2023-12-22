"use client";

import { popupAtom } from "@/components/common/Popup/atom";
import { ProductInfoForm } from "@/components/products/ProductInfoForm";
import { IProduct } from "@/data/products";
import { useAtom } from "jotai";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }: { product: IProduct }) {
  const [, setPopupState] = useAtom(popupAtom);
  const handlePopupOpen = (product: IProduct) => {
    setPopupState({
      open: true,
      component: <ProductInfoForm product={product} />,
    });
  };
  const isOutOfStock = product.stock === 0;
  const isNew = !!product.new;
  const url = `/products/${product.slug}`;

  return (
    <div
      data-aos="fade-up"
      className="bg-brand-100 relative rounded-xl opverflow-hidden"
      key={product.slug}
    >
      <Link href={url} className="">
        {isNew && (
          <div className="absolute top-2 left-2 bg-brand-secondary/80 text-white px-2 py-1 rounded-xl text-sm">
            New
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute bg-pink-100/60 inset-0 grid place-items-center text-brand-500 font-semibold">
            Out of stock
          </div>
        )}
        {/* <div className="grid place-items-center rounded-xl bg-white">
          // eslint-disable-next-line 
          <img
            src={product.thumbnail}
            alt={product.name}
            className="rounded-xl object-cover h-48"
            height={500}
            width={500}
          />
        </div> */}
        {/* <div className="relative flex-grow pb-2/3 overflow-hidden">
          eslint-disable-next-line 
          <img
            className="absolute object-cover min-w-full min-h-full w-full h-full"
            src={product.thumbnail}
            alt={product.name}
          />
        </div> */}
        <div className="flex aspect-square">
          {/* eslint-disable-next-line  */}
          <img
            className="object-cover min-w-full min-h-full w-full h-full rounded-xl"
            src={product.thumbnail}
            alt={product.name}
          />
        </div>

        <div className="p-1.5">
          <div className="line-clamp-2 font-semibold">{product.name}</div>
          {product?.sizes?.length !== 0 && (
            <div className="text-sm mt-2">
              Size: {product?.sizes?.map((size) => size).join(", ")}
            </div>
          )}
          {product.price && (
            <div className="text- mt-4">
              Price: {product.price} {product.currency}
            </div>
          )}
        </div>
      </Link>
      {!isOutOfStock && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePopupOpen(product);
          }}
          className="absolute bg-pink-100 rounded-full right-2 top-2"
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );
}
