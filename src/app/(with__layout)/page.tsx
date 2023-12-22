"use client";

// import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { set } from "mongoose";

const word = "Vintage".split("");

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null!);
  const scrollingSectionRef = useRef<HTMLDivElement>(null!);

  const [translate, setTranslate] = useState(90);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const { scrollY } = useScroll({});

  const handleWindowWidthChange = () => {
    setWindowWidth(window.innerWidth + 100);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth + 100);
    window.addEventListener("resize", handleWindowWidthChange);
  }, []);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const heroTextIsInCenter =
        Number(
          window
            .getComputedStyle(scrollingSectionRef.current)
            .transform.split(", ")[4]
        ) === 0;

      setShowButtons(heroTextIsInCenter);
      // console.log(heroTextIsInCenter);
      // console.log(scrollingSectionRef.current?.getBoundingClientRect().x);
      setTranslate(latest);
    });
  }, []);

  // console.log(windowWidth);

  // const [textStyles, textApi] = useSpring(() => ({
  //   y: "100%",
  // }));

  // const { scrollYProgress, scrollY } = useScroll({
  //   container: containerRef,
  //   onChange: ({ value: { scrollYProgress } }) => {
  //     console.log("on Change", scrollYProgress);

  //     // if (scrollYProgress > 0.7) {
  //     //   textApi.start({ y: "0" });
  //     // } else {
  //     //   textApi.start({ y: "100%" });
  //     // }
  //   },
  //   default: {
  //     immediate: true,
  //   },
  // });

  // console.log(scrollYProgress, scrollY);

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
    <div>
      <div className="h-[120vh] relative =bg-blue-400">
        <div
          ref={containerRef}
          className="h-[80dvh] =bg-red-400 sticky top-0 left-0 right-0 bottom-0 flex items-center justify-center overflow-x-hidden"
        >
          <motion.div
            // style={{ translateX: `${Math.max(1, 90)}%` }}
            // style={{ translateX: `${0}px` }}
            ref={scrollingSectionRef}
            style={{
              // math.max is for stopping the translateX to go below 0
              translateX: `${Math.max(
                0,
                Math.min(windowWidth - translate - 200, windowWidth / 2)
              )}px`,
            }}
          >
            <div>
              <span className="text-[23vw] font-bold text-brand-primary">
                Vintage
              </span>
              {/* {showButtons && ( */}
              <div
                data-aos="fade-up"
                className="=bg-cyan-400 grid place-items-center mt-4 space-y-2"
              >
                <Link href="/products">
                  <button className="bg-brand-secondary text-brand-primary font-semibold px-6 py-2 rounded-xl focus:ring focus:outline-none focus:ring-brand-secondary transition-[box-shadow] focus:ring-offset-2">
                    Click here to Shop
                  </button>
                </Link>
                <Link href="/cart">
                  <button className="border-[3px] text-brand-secondary-2 border-brand-secondary font-semibold px-6 py-1.5 rounded-xl focus:ring focus:outline-none focus:ring-brand-secondary transition-[box-shadow] focus:ring-offset-2">
                    Go to cart
                  </button>
                </Link>
              </div>
              {/* )} */}
            </div>
          </motion.div>

          {/* <div>
          {word.map((letter, index) => {
            return (
              <animated.span
                key={index}
                // style={{
                //   opacity: scrollYProgress,
                // }}
              >
                {letter}
              </animated.span>
            );
          })}
        </div> */}
        </div>

        {/* <div data-aos="fade-up"> */}
        {/* <div className="mt-8">
          <h1 className="text-center text-balance text-4xl font-extrabold">
            Vintage
          </h1>
        </div> */}
        {/* <div className="masked-hero-image max-w-md w-3/4 mx-auto mt-8">
            <Image
              src="/images/home/1.png"
              alt="Hero Image"
              width={500}
              height={500}
            />
          </div> */}
        {/* </div> */}
      </div>
      <div className="mt-8 grid place-items-center">
        <p
          className="font-extrabold text-brand-primary text-2xl text-center "
          //  data-aos="fade-up"
        >
          Featured Products
        </p>
        <div className="mt-8 space-y-6">
          <Image
            src="/images/products/jacket-green.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-t-full"
            // data-aos="fade-up"
          />
          <Image
            src="/images/products/jacket-khaki.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-[40px]"
            // data-aos="fade-up"
          />
          <Image
            src="/images/products/jacket-red.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-[40px]"
            // data-aos="fade-up"
          />
        </div>
      </div>
      <div
        //  data-aos="fade-up"
        className="mt-8"
      >
        <p className="text-brand-primary text-center font-bold text-2xl">
          Contact Us
        </p>
        <div className="text-brand-primary text-center flex justify-center gap-2">
          <span>Phone</span>
          <span>+98 937 748 45</span>
        </div>
        <div className="mx-auto mt-4 w-[90%] bg-brand-primary  p-4 py-6 rounded-2xl">
          <form className="space-y-4" onSubmit={handleSubmit} name="contact">
            <div>
              <label htmlFor="fullname" className="text-brand-secondary">
                Your fullname
              </label>
              <input
                type="text"
                className="py-2 h-10 rounded-lg px-3 w-full"
                placeholder="Fullname"
                name="fullname"
                id="fullname"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-brand-secondary">
                Your Message
              </label>
              <textarea
                rows={5}
                className="py-2 rounded-lg px-3 w-full"
                placeholder="message"
                name="message"
                id="message"
              />
            </div>
            <button
              disabled={isLoading}
              className="bg-brand-secondary disabled:opacity-50 disabled:pointer-events-none mt-4 font-semibold px-3 py-1.5 text-sm rounded-xl focus:ring focus:outline-none focus:ring-brand-secondary transition-[box-shadow] focus:ring-offset-2"
            >
              {isLoading ? "Sendng..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
