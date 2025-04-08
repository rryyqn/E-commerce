import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-50 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col justify-between gap-12 xl:gap-20 md:flex-row">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-4 p-4">
          <Link href="/">
            <div className="text-2xl tracking-wide flex items-center gap-3">
              <Image src="/logo.png" alt="logo" width={24} height={24} />
              LAMA
            </div>
          </Link>
          <p className="text-gray-600">
            America&apos;s leading fashion and home decor retailer
          </p>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="Facebook" width={16} height={16} />
            <Image
              src="/instagram.svg"
              alt="Instagram"
              width={16}
              height={16}
            />
            <Image src="/youtube.png" alt="Youtube" width={16} height={16} />
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex w-1/2 justify-between p-4">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-lg">COMPANY</h1>
            <div className="flex flex-col gap-3 text-gray-600">
              <Link href="/">About Us</Link>
              <Link href="/">Careers</Link>
              <Link href="/">Affiliates</Link>
              <Link href="/">Blog</Link>
              <Link href="/">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-lg">SHOP</h1>
            <div className="flex flex-col gap-3 text-gray-600">
              <Link href="/">New Arrivals</Link>
              <Link href="/">Accessories</Link>
              <Link href="/">Men</Link>
              <Link href="/">Women</Link>
              <Link href="/list">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-lg">SUPPORT</h1>
            <div className="flex flex-col gap-3 text-gray-600">
              <Link href="/">Customer Service</Link>
              <Link href="/">My Account</Link>
              <Link href="/">Find a Store</Link>
              <Link href="/">Gift Cards</Link>
              <Link href="/">Legal and Privacy</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-12 p-4">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-lg">SUBSCRIBE</h1>
            <p className="text-gray-600">
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
            <div className="flex gap-1">
              <Input
                placeholder="Email Address"
                className="p-4 w-3/4 bg-white shadow-none"
                type="text"
              />

              <Button className="w-1/4 bg-lama text-white hover:bg-white hover:ring-2 hover:ring-lama hover:text-lama transition-all shadow-none">
                JOIN
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold">Secure Payments</span>
            <div className="flex gap-2">
              <Image src="/paypal.png" alt="discover" width={40} height={20} />
              <Image
                src="/mastercard.png"
                alt="discover"
                width={40}
                height={20}
              />
              <Image src="/visa.png" alt="discover" width={40} height={20} />
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12">
        <div className="">&copy; {new Date().getFullYear()} Lama Fashion</div>
        <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-3">Language</span>
            <span className="font-medium">English</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-3">Currency</span>
            <span className="font-medium">$ AUD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
