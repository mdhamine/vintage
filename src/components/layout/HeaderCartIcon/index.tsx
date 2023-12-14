"use client";

import { pointerAtom } from "@/atoms/pointer";
import { cartAtom } from "@/components/common/Cart/atom";
import { useAtom } from "jotai";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";

export const HeaderCartIcon = () => {
  const [cartState] = useAtom(cartAtom);
  const [showPointer, setShowPointer] = useAtom(pointerAtom);

  useEffect(() => {
    if (showPointer) {
      setTimeout(() => {
        setShowPointer(false);
      }, 5_000);
    }
  }, [showPointer, setShowPointer]);

  return (
    <div className="relative">
      {cartState.length > 0 && (
        <span className="bg-brand-600 rounded-full w-6 h-6 font-semibold text-sm grid place-items-center absolute -top-3 -right-2">
          {cartState.length}
        </span>
      )}
      <ShoppingCart />
      {showPointer && (
        <>
          {/* eslint-disable-next-line  */}
          <img src="/pointer.gif" alt="" className="absolute top-[110%] w-8" />
        </>
      )}
    </div>
  );
};
