import { Popup } from "@/components/common/Popup";
import { Tiktok } from "@/components/icons/Tiktok";
import { HeaderCartIcon } from "@/components/layout/HeaderCartIcon";
import { Facebook, Instagram, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="flex h-20 z-10 sticky top-0 bg-brand-400 justify-between items-center p-4">
        <Link href="/">
          <Image
            alt=""
            src="/images/site/logo.png"
            className=""
            width={40}
            height={40}
          />
        </Link>
        <Link href="/cart">
          <HeaderCartIcon />
        </Link>
      </nav>
      <main className="p-4 ">{children}</main>
      <footer>
        <div className="flex pb-12 pt-6 text-brand-500 justify-between items-center w-1/2 mx-auto">
          <Facebook />
          <Instagram />
          <Tiktok />
        </div>
        <div className="bg-brand-500">
          <p className="text-center font-semibold">
            Copyright &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      <Popup />
    </>
  );
}
