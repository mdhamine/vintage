import { Popup } from "@/components/common/Popup";
import { AppToaster } from "@/components/common/Toaster";
import { Tiktok } from "@/components/icons/Tiktok";
import { HeaderCartIcon } from "@/components/layout/HeaderCartIcon";
import { Facebook, Instagram, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import "react-loading-skeleton/dist/skeleton.css";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="flex h-20 z-10 justify-between items-center p-4">
        <Link href="/">
          {/* <p className="font-semibold text-brand-secondary">RABIL CANDY</p> */}
          <Image
            alt=""
            // src="/images/site/logo-transparent.png"
            src="/images/site/vintage.png"
            className="align-left"
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
        <div className="flex pb-12 pt-6 text-brand-primary justify-between items-center w-1/2 mx-auto">
          <Facebook />
          <Instagram />
          <Tiktok />
        </div>
        <div className="bg-brand-primary">
          <p className="text-center text-brand-secondary font-semibold">
            Copyright &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      <Popup />
      <AppToaster />
    </>
  );
}
