import { useAtom } from "jotai";
import { FormEvent, useState } from "react";
import { cartAtom } from "../Cart/atom";
import { popupAtom } from "../Popup/atom";
import { SelectOptions } from "@/data/select";
import { Plus } from "lucide-react";

export const CheckoutForm = () => {
  const [cartState, setCartState] = useAtom(cartAtom);
  const [, setPopupState] = useAtom(popupAtom);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();

    const fullname = document.forms["product-info" as any]["fullname"]?.value;
    const phone = document.forms["product-info" as any]["phone"]?.value;
    const address = document.forms["product-info" as any]["address"]?.value;
    const delivery = document.forms["product-info" as any]["delivery"]?.value;

    if (!fullname || !phone || !address || !delivery) {
      return alert(`Please fill all fields`);
    }

    const res = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        fullname,
        phone,
        address,
        products: cartState,
        delivery,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    alert(
      json?.message ||
        `We have received your order and will contact you shortly`
    );

    if (json?.success) {
      setCartState([]);
    }

    setPopupState({
      open: false,
    });
    setSubmitting(false);
  };

  return (
    <div className="bg-white w-11/12 p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl">Enter Details</p>
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
      <form
        className="my-2 space-y-2 mt-4"
        onSubmit={handleSubmit}
        name="product-info"
      >
        <div>
          <label htmlFor="fullname">Your fullname</label>
          <input
            type="text"
            className="border-2 border-brand-300 py-2 h-10 rounded-lg px-3 w-full"
            placeholder="Fullname"
            name="fullname"
            id="fullname"
          />
        </div>
        <div>
          <label htmlFor="phone">Your Phone</label>
          <input
            type="text"
            className="border-2 border-brand-300 py-2 h-10 rounded-lg px-3 w-full"
            placeholder="Phone"
            name="phone"
            id="phone"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address">Your Address</label>
          <select
            name="address"
            id="address"
            className="h-10 border-2 border-brand-300 rounded-lg px-3"
          >
            {SelectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="delivery">Delivery Type</label>
          <select
            name="delivery"
            id="delivery"
            className="h-10 border-2 border-brand-300 rounded-lg px-3"
          >
            <option value="type 1">Type 1</option>
            <option value="type 2">Type 2</option>
          </select>
        </div>
        <div className="pt-4">
          <button
            disabled={submitting}
            className="bg-brand-400 disabled:opacity-60 w-full font-semibold px-3 py-3 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2"
          >
            {submitting ? "Submitting" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};
