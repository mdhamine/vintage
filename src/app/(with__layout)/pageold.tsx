"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const fullname = document.forms["contact" as any]["fullname"];
    const message = document.forms["contact" as any]["message"];

    try {
      await fetch("https://formsubmit.co/ajax/cyn.webservices@gmail.com", {
        method: "POST",
        body: JSON.stringify({
          fullname: fullname.value,
          message: message.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      fullname.value = "";
      message.value = "";
      setIsLoading(false);
      // alert("We have successfully received your message.");
      toast.success("لقد استلمنا رسالتك بنجاح.");
    }
  };
  return (
    <>
      <div data-aos="fade-up">
        <div className="mt-8">
          <h1
            style={{
              fontFamily: "lobster",
            }}
            className="text-center text-brand-primary text-balance text-5xl"
          >
            Rabil Candy
          </h1>
        </div>
        <div className="grid place-items-center mt-4 space-y-2">
          <Link href="/products">
            <button className="bg-brand-primary border-2 border-brand-secondary-2 text-brand-secondary-2 font-semibold px-6 py-2 rounded-xl focus:ring focus:outline-none focus:ring-brand-primary transition-[box-shadow] focus:ring-offset-2">
              اضغط هنا للتسوق
            </button>
          </Link>
        </div>
        <div className="masked-hero-image max-w-md w-3/4 mx-auto mt-8">
          <Image
            src="/images/home/hero.png"
            alt="Hero Image"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div data-aos="fade-up" className="mt-8 grid place-items-center">
        <p className="font-extrabold text-2xl text-center underline decoration-underline-secondary text-brand-secondary">
          Here&apos;s what our customers say
          {/* إليك ما يقوله عميلنا: */}
        </p>
        <div className="mt-8 mb-8 space-y-6 font-medium text-center text-brand-primary">
          <p>محل حلويات رابيل هو مكان رائع لتلبية رغباتك في الحلوى.</p>
          <p>لا تفوت هذا الجنة السكرية!</p>
          <p>
            حلوى رابيل رائعة بكل تأكيد! جربت حلوياتهم ويجب أن أقول، إنها لذيذة
            بالفعل، سأقوم بالتأكيد بشراءها مرة أخرى!
          </p>
        </div>
      </div>
      {/* <div className="mt-8 grid place-items-center">
        <p className="font-extrabold text-2xl text-center" data-aos="fade-up">
          Featured Products
        </p>
        <div className="mt-8 space-y-6">
          <Image
            src="/images/home/featured/1.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-t-full"
            data-aos="fade-up"
          />
          <Image
            src="/images/home/featured/2.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-[40px]"
            data-aos="fade-up"
          />
          <Image
            src="/images/home/featured/3.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-[40px]"
            data-aos="fade-up"
          />
        </div>
      </div> */}
      <div data-aos="fade-up" className="mt-8">
        <p className="text-brand-secondary text-center font-bold text-2xl">
          {/* Contact Us */}
          اتصل بنا
        </p>
        <div className="text-brand-secondary text-center flex justify-center gap-2">
          <span>
            {/* Phone */}
            الهاتف
          </span>
          <span>+924235235235</span>
        </div>
        <div className="mx-auto mt-4 w-[90%] bg-[#7D423D] p-4 py-6 rounded-2xl">
          <form className="space-y-4" onSubmit={handleSubmit} name="contact">
            <div className="space-y-2">
              <label htmlFor="fullname" className="text-brand-secondary">
                {/* Name* */}
                اسم
              </label>
              <input
                type="text"
                className="border-2 border-brand-secondary py-2 h-12 rounded-2xl px-3 w-full focus:outline-none"
                placeholder="Fullname"
                name="fullname"
                id="fullname"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-brand-secondary">
                رسالة
              </label>
              <textarea
                rows={5}
                className="border-2 border-brand-secondary text-brand-secondary py-2 rounded-2xl px-3 w-full"
                placeholder="Enter your message"
                name="message"
                id="message"
                required
              />
            </div>
            <div className="grid place-items-center">
              <button
                disabled={isLoading}
                className="bg-brand-secondary disabled:opacity-50 disabled:pointer-events-none mt-4 font-medium px-6 py-2.5 rounded-2xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2"
              >
                {isLoading ? "جاري الإرسال..." : "إرسال رسالة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
