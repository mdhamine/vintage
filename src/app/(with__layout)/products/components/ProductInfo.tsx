"use client";
import { cartAtom } from "@/components/common/Cart/atom";
import { popupAtom } from "@/components/common/Popup/atom";
import { ProductInfoForm } from "@/components/products/ProductInfoForm";
import { IProduct } from "@/data/products";
import { useAtom } from "jotai";

export const ProductInfo = ({ product }: { product: IProduct }) => {
  const [, setPopupState] = useAtom(popupAtom);
  const [cartState] = useAtom(cartAtom);

  const isAlreadyInCart = cartState.find((item) => item.slug === product.slug);

  const outOfStock = product.stock === 0;

  const handlePopupOpen = () => {
    setPopupState({
      open: true,
      component: <ProductInfoForm product={product} />,
    });
  };
  return (
    <>
      {/* eslint-disable-next-line  */}
      <img
        className="mt-4 rounded-xl"
        src={product?.thumbnail}
        alt={product.name}
      />
      <div className="mb-4 mt-2">
        <p className="text-brand-500 text-xl font-semibold">{product.name}</p>
        <p className="mt-1">{product?.description}</p>
      </div>

      <p>
        {product.price} {product.currency}
      </p>
      {product?.sizes?.length !== 0 && (
        <p>Sizes: {product?.sizes?.join(", ")}</p>
      )}
      {product?.color?.length !== 0 && (
        <p>
          Colors:{" "}
          <span className="capitalize">{product?.color?.join(", ")}</span>
        </p>
      )}
      {outOfStock && (
        <div className="text-center bg-brand-400/30 rounded-lg py-1 mt-2">
          Out of stock
        </div>
      )}
      <div className="mt-4 grid place-items-center">
        <button
          disabled={outOfStock}
          className="disabled:opacity-50 disabled:pointer-events-none btn-primary"
          onClick={handlePopupOpen}
        >
          {isAlreadyInCart ? "Update cart" : "Add to cart"}
        </button>
      </div>
    </>
  );
};
