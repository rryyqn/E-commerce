"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CartModal from "./CartModal";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const NavIcons = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const router = useRouter();

  const isLoggedIn = false; //TEMP

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setProfileOpen(!profileOpen);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {profileOpen && (
        // <div className="absolute p-4 rounded-md top-12 left-0 text-sm border z-20">
        //   <Link href="/">Profile</Link>
        //   <div className="mt-2 cursor-pointer">Logout</div>
        // </div>
        <Card className="absolute p-4 rounded-md top-12 -left-16 text-sm border z-20 w-40">
          <CardHeader>
            <CardTitle>
              <h1 className="text-lg pb-2">User Settings</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full justify-start" variant="ghost">
              <Link href="/">Profile</Link>
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              Logout
            </Button>
          </CardContent>
        </Card>
      )}
      <Image
        src="/notification.png"
        alt="notification"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setCartOpen(!cartOpen)}
      >
        <Image src="/cart.png" alt="cart" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-5 h-5 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          2
        </div>
      </div>
      {cartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
