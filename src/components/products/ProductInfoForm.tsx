import { IProduct } from "@/data/products";
import { cartAtom } from "../common/Cart/atom";
import { useAtom } from "jotai";
import { popupAtom } from "../common/Popup/atom";
import { FormEvent, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { pointerAtom } from "@/atoms/pointer";

export const ProductInfoForm = ({ product }: { product: IProduct }) => {
  const [cartState, setCartState] = useAtom(cartAtom);
  const [, setPopupState] = useAtom(popupAtom);
  const [, setShowPointer] = useAtom(pointerAtom);

  const [quantity, setQuantity] = useState(() => {
    const item = cartState.find((item) => item.slug === product.slug);
    return item?.quantity || 1;
  });

  const isAlreadyInCart = cartState.find((item) => item.slug === product.slug);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const size = document.forms["product-info" as any]["size"].value;
    const color = document.forms["product-info" as any]["color"].value;

    if (isAlreadyInCart) {
      // we modify the cart if current item is already in cart
      // update the size and color to latest selected values
      setCartState((prev) => {
        return prev.map((item) => {
          if (item.slug === product.slug) {
            return {
              ...item,
              size,
              color,
              quantity,
            };
          }

          return item;
        });
      });
      alert(`Item updated in cart`);
    } else {
      setCartState((prev) => {
        if (!prev) return [];
        return [
          ...prev,
          {
            slug: product.slug!,
            size,
            color,
            quantity,
          },
        ];
      });

      alert(`Item successfully added to cart`);
    }

    setShowPointer(true);
    setPopupState({
      open: false,
    });
  };

  return (
    <div className="bg-white w-11/12 p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl">Select options</p>
        <button
          onClick={() => {
            setPopupState({
              open: false,
            });
          }}
          className="rotate-45 bg-gray-100 p-0.5 rounded-full grid place-items-center"
        >
          <Plus size={20} />
        </button>
      </div>
      <form className="my-2" onSubmit={handleSubmit} name="product-info">
        <div>
          <label htmlFor="size" className="mr-4">
            Size
          </label>
          <select className="bg-gray-200 rounded-lg p-1" name="size" id="size">
            {product?.sizes?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="color" className="mr-4">
            Color
          </label>
          <select
            className="bg-gray-200 rounded-lg p-1"
            name="color"
            id="color"
          >
            {product?.color?.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex items-center">
          <label htmlFor="color" className="mr-4">
            Quantity
          </label>
          <div className="flex gap-4 items-center">
            <button
              type="button"
              className="h-6 inline-grid place-items-center w-6 bg-gray-200 rounded-full"
              onClick={() => {
                if (quantity === 1) return;
                setQuantity((prev) => prev - 1);
              }}
            >
              <Minus size={16} />
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              type="button"
              className="h-6 inline-grid place-items-center w-6 bg-gray-200 rounded-full"
              onClick={() => {
                if (quantity === product.stock) return;
                setQuantity((prev) => prev + 1);
              }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <button className="bg-brand-400 mt-4 font-semibold px-3 py-1.5 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2">
          {isAlreadyInCart ? "Update Cart" : "Add to Cart"}
        </button>
      </form>
    </div>
  );
};
