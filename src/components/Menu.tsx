"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";

const MenuButton = () => {
  const [open, setOpen] = useState(false);
  const wixClient = useWixClient();

  const { cart, counter, getCart } = useCartStore();
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div>
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        <Menu />
      </div>

      <div
        className={clsx(
          "absolute left-0 top-20 w-full h-[calc(100vh-80px)] bg-white text-black flex flex-col items-center justify-center gap-8 text-xl z-30 transition-all duration-500 ease-in-out",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <Link href="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link href="/list" onClick={() => setOpen(false)}>
          Shop
        </Link>
        <Link href="/" onClick={() => setOpen(false)}>
          Deals
        </Link>
        <Link href="/" onClick={() => setOpen(false)}>
          About
        </Link>
        <Link href="/" onClick={() => setOpen(false)}>
          Contact
        </Link>
        <Link href="/cart" onClick={() => setOpen(false)}>
          <div className="relative cursor-pointer">
            Cart
            <div className="absolute -top-2 -right-5 w-5 h-5 bg-lama rounded-full text-white text-sm flex items-center justify-center">
              {counter}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuButton;
