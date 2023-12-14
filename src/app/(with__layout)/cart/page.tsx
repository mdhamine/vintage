"use client";

import { cartAtom } from "@/components/common/Cart/atom";
import { CheckoutForm } from "@/components/common/Checkout";
import { popupAtom } from "@/components/common/Popup/atom";
import { IProduct } from "@/data/products";
import { useAtom } from "jotai";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartState, setCartState] = useAtom(cartAtom);
  const [popupState, setPopupState] = useAtom(popupAtom);
  const [shouldRefetchProducts, setShouldRefetchProducts] = useState(true);

  const [products, setProducts] = useState([] as IProduct[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (shouldRefetchProducts) {
        if (!cartState.length) {
          setIsLoading(false);
          setProducts([]);
          return;
        }

        setIsLoading(true);
        const res = await fetch(
          `/api/product?slugs=${cartState.map((item) => item.slug).join(",")}`
        );
        const json = await res.json();

        setProducts(json?.data || []);
        setIsLoading(false);
      }
      setShouldRefetchProducts(false);
    })();
  }, [shouldRefetchProducts, cartState]);

  const handleItemRemove = (id?: string) => {
    setCartState((prev) => {
      return prev.filter((item) => item.slug !== id);
    });
    setShouldRefetchProducts(true);
  };

  const handleQuantityDecrease = (itemSlug?: string) => {
    if (!cartState) return;

    setCartState((prev) => {
      return prev.map((item) => {
        if (item.slug === itemSlug) {
          if (!item.quantity) {
            item.quantity = 1;
          } else {
            item.quantity -= 1;
          }
        }

        return item;
      });
    });
  };

  const handleQuantityIncrease = (product: IProduct, itemSlug?: string) => {
    if (!cartState) return;

    setCartState((prev) => {
      return prev.map((item) => {
        if (item.slug === itemSlug) {
          if (item.quantity !== product.stock) {
            item.quantity = (item.quantity || 0) + 1;
          }
        }

        return item;
      });
    });
  };

  const handleCheckout = () => {
    setPopupState({
      open: true,
      component: <CheckoutForm />,
    });
  };

  // console.log(products, "prod");

  return (
    <div className="min-h-screen">
      <div>
        <p className="font-extrabold text-3xl">Your Cart</p>
      </div>
      <div className="mt-8">
        {isLoading && <p>Loading...</p>}
        {products?.map((product) => {
          // if (!item) return null;
          const item = cartState.find((item) => item.slug === product?.slug);
          return (
            <div key={product?._id} className="">
              <div className="relative">
                {/* eslint-disable-next-line */}
                <img
                  className="rounded-xl"
                  src={product?.thumbnail}
                  alt={product?.name}
                />
                <button
                  onClick={() => handleItemRemove(item?.slug)}
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bottom-4 bg-brand-400 font-semibold px-3 py-1 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2"
                >
                  Remove from cart
                </button>
              </div>
              <p className="text-brand-500 text-lg font-semibold mt-2">
                {product?.name}
              </p>
              <p>Color: {item?.color}</p>
              <p>Size: {item?.size}</p>
              <p>
                Price: {product?.price} {product?.currency}
              </p>
              <div className="mt-2 mb-6 flex items-center">
                <label htmlFor="color" className="mr-4">
                  Quantity
                </label>
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    className="h-6 inline-grid place-items-center w-6 bg-brand-400 rounded-full"
                    onClick={() => handleQuantityDecrease(item?.slug)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl">{item?.quantity}</span>
                  <button
                    type="button"
                    className="h-6 inline-grid place-items-center w-6 bg-brand-400 rounded-full"
                    onClick={() => handleQuantityIncrease(product, item?.slug)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {cartState.length === 0 && !isLoading && (
        <>
          <div className="mb-4">Your cart is empty.</div>
          <Link href="/products">
            <button className="btn-primary">Click here to shop</button>
          </Link>
        </>
      )}
      {!isLoading && products.length !== 0 && (
        <>
          <div className="h-0.5 bg-brand-300 my-4" />
          <div className="flex justify-between items-center">
            <span>Total</span>
            <span>
              {products.reduce((acc, item) => {
                if (!item.price) return acc;
                return acc + item?.price;
              }, 0)}
            </span>
          </div>
          <div className="mt-4">
            <button className="btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
