import { useAtom } from "jotai";
import { FormEvent, useState } from "react";
import { cartAtom } from "../Cart/atom";
import { popupAtom } from "../Popup/atom";
import { SelectOptions } from "@/data/select";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

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
      // return alert(`Please fill all fields`);
      toast.success("يرجى ملء جميع الحقول");
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

    // alert(
    //   json?.message ||
    //     `We have received your order and will contact you shortly`
    // );
    alert(json?.message || "لقد تلقينا طلبك وسنتواصل معك قريبًا.");

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
        <p className="font-semibold text-xl">
          {/* Enter Details */}
          أدخل التفاصيل
        </p>
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
          <label htmlFor="fullname">اسمك الكامل</label>
          <input
            type="text"
            className="border-2 border-brand-secondary-2 py-2 h-10 rounded-lg px-3 w-full"
            placeholder="Fullname"
            name="fullname"
            id="fullname"
          />
        </div>
        <div>
          <label htmlFor="phone">الهاتف الخاص بك</label>
          <input
            type="text"
            className="border-2 border-brand-secondary-2 py-2 h-10 rounded-lg px-3 w-full"
            placeholder="Phone"
            name="phone"
            id="phone"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address">عنوانك</label>
          <select
            name="address"
            id="address"
            className="h-10 border-2 border-brand-secondary-2 rounded-lg px-3"
          >
            <option value="Adrar">Adrar</option>
            <option value="Chlef">Chlef</option>
            <option value="Laghouat">Laghouat</option>
            <option value="Oum El Bouaghi">Oum El Bouaghi</option>
            <option value="Batna">Batna</option>
            <option value="Béjaïa">Béjaïa</option>
            <option value="Biskra">Biskra</option>
            <option value="Béchar">Béchar</option>
            <option value="Blida">Blida</option>
            <option value="Bouira">Bouira</option>
            <option value="Tamanrasset">Tamanrasset</option>
            <option value="Tébessa">Tébessa</option>
            <option value="Tlemcen">Tlemcen</option>
            <option value="Tiaret">Tiaret</option>
            <option value="Tizi Ouzou">Tizi Ouzou</option>
            <option value="Algiers">Algiers</option>
            <option value="Djelfa">Djelfa</option>
            <option value="Jijel">Jijel</option>
            <option value="Sétif">Sétif</option>
            <option value="Saida">Saida</option>
            <option value="Skikda">Skikda</option>
            <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
            <option value="Annaba">Annaba</option>
            <option value="Guelma">Guelma</option>
            <option value="Constantine">Constantine</option>
            <option value="Médéa">Médéa</option>
            <option value="Mostaganem">Mostaganem</option>
            <option value="M'Sila">M&apos;Sila</option>
            <option value="Mascara">Mascara</option>
            <option value="Ouargla">Ouargla</option>
            <option value="Oran">Oran</option>
            <option value="El Bayadh">El Bayadh</option>
            <option value="Illizi">Illizi</option>
            <option value="Bordj Bou Arréridj">Bordj Bou Arréridj</option>
            <option value="Boumerdès">Boumerdès</option>
            <option value="El Tarf">El Tarf</option>
            <option value="Tindouf">Tindouf</option>
            <option value="Tissemsilt">Tissemsilt</option>
            <option value="El Oued">El Oued</option>
            <option value="Khenchela">Khenchela</option>
            <option value="Souk Ahras">Souk Ahras</option>
            <option value="Tipaza">Tipaza</option>
            <option value="Mila">Mila</option>
            <option value="Aïn Defla">Aïn Defla</option>
            <option value="Naâma">Naâma</option>
            <option value="Aïn Témouchent">Aïn Témouchent</option>
            <option value="Ghardaïa">Ghardaïa</option>
            <option value="Relizane">Relizane</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="delivery">نوع التوصيل</label>
          <select
            name="delivery"
            id="delivery"
            className="h-10 border-2 border-brand-secondary-2 rounded-lg px-3"
          >
            <option value="Stop desk">Stop desk</option>
            <option value="Domicile">Domicile</option>
            {/* <option value="type 1">Type 1</option>
            <option value="Adrar">Adrar</option>
            <option value="Chlef">Chlef</option>
            <option value="Laghouat">Laghouat</option>
            <option value="Oum El Bouaghi">Oum El Bouaghi</option>
            <option value="Batna">Batna</option>
            <option value="Béjaïa">Béjaïa</option>
            <option value="Biskra">Biskra</option>
            <option value="Béchar">Béchar</option>
            <option value="Blida">Blida</option>
            <option value="Bouira">Bouira</option>
            <option value="Tamanrasset">Tamanrasset</option>
            <option value="Tébessa">Tébessa</option>
            <option value="Tlemcen">Tlemcen</option>
            <option value="Tiaret">Tiaret</option>
            <option value="Tizi Ouzou">Tizi Ouzou</option>
            <option value="Algiers">Algiers</option>
            <option value="Djelfa">Djelfa</option>
            <option value="Jijel">Jijel</option>
            <option value="Sétif">Sétif</option>
            <option value="Saida">Saida</option>
            <option value="Skikda">Skikda</option>
            <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
            <option value="Annaba">Annaba</option>
            <option value="Guelma">Guelma</option>
            <option value="Constantine">Constantine</option>
            <option value="Médéa">Médéa</option>
            <option value="Mostaganem">Mostaganem</option>
            <option value="M'Sila">M&apos;Sila</option>
            <option value="Mascara">Mascara</option>
            <option value="Ouargla">Ouargla</option>
            <option value="Oran">Oran</option>
            <option value="El Bayadh">El Bayadh</option>
            <option value="Illizi">Illizi</option>
            <option value="Bordj Bou Arréridj">Bordj Bou Arréridj</option>
            <option value="Boumerdès">Boumerdès</option>
            <option value="El Tarf">El Tarf</option>
            <option value="Tindouf">Tindouf</option>
            <option value="Tissemsilt">Tissemsilt</option>
            <option value="El Oued">El Oued</option>
            <option value="Khenchela">Khenchela</option>
            <option value="Souk Ahras">Souk Ahras</option>
            <option value="Tipaza">Tipaza</option>
            <option value="Mila">Mila</option>
            <option value="Aïn Defla">Aïn Defla</option>
            <option value="Naâma">Naâma</option>
            <option value="Aïn Témouchent">Aïn Témouchent</option>
            <option value="Ghardaïa">Ghardaïa</option>
            <option value="Relizane">Relizane</option> */}
          </select>
        </div>
        <div className="pt-4">
          <button
            disabled={submitting}
            className="bg-brand-primary text-brand-secondary-2 border border-brand-secondary-2 disabled:opacity-60 w-full font-semibold px-3 py-3 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2"
          >
            {submitting ? "جاري التقديم" : "تأكيد الطلب"}
          </button>
        </div>
      </form>
    </div>
  );
};
