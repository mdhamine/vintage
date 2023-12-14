"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

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
      alert("We have successfully received your message.");
    }
  };
  return (
    <>
      <div data-aos="fade-up">
        <div className="mt-8">
          <h1 className="text-center text-balance text-4xl font-extrabold">
            Shop your favorites
          </h1>
        </div>
        <div className="grid place-items-center mt-4 space-y-2">
          <Link href="/products">
            <button className="bg-brand-400 font-semibold px-6 py-2 rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2">
              Click here to Shop
            </button>
          </Link>
          <Link href="/cart">
            <button className="border-[3px] border-brand-400 font-semibold px-6 py-1.5 rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2">
              Go to cart
            </button>
          </Link>
        </div>
        <div className="masked-hero-image max-w-md w-3/4 mx-auto mt-8">
          <Image
            src="/images/home/1.png"
            alt="Hero Image"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="mt-8 grid place-items-center">
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
      </div>
      <div data-aos="fade-up" className="mt-8">
        <p className="text-brand-500 text-center font-bold text-2xl">
          Contact Us
        </p>
        <div className="text-brand-600 text-center flex justify-center gap-2">
          <span>Phone</span>
          <span>+98 937 748 45</span>
        </div>
        <div className="mx-auto mt-4 w-[90%] bg-brand-300 p-4 py-6 rounded-2xl">
          <form className="space-y-4" onSubmit={handleSubmit} name="contact">
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
              <label htmlFor="message">Your Message</label>
              <textarea
                rows={5}
                className="border-2 border-brand-300 py-2 rounded-lg px-3 w-full"
                placeholder="message"
                name="message"
                id="message"
              />
            </div>
            <button
              disabled={isLoading}
              className="bg-brand-500 disabled:opacity-50 disabled:pointer-events-none mt-4 font-semibold px-3 py-1.5 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-400 transition-[box-shadow] focus:ring-offset-2"
            >
              {isLoading ? "Sendng..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
