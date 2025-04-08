"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
const MenuButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        <Menu />
      </div>
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <Link href="/">Home</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Cart(1)</Link>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
