"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import CartModal from "./CartModal";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const NavIcons = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const wixClient = useWixClient();

  useEffect(() => {
    const checkLoginStatus = () => {
      setLoginStatus(wixClient.auth.loggedIn());
    };

    checkLoginStatus();
  }, [wixClient, pathname]);

  const handleProfile = () => {
    setProfileOpen(!profileOpen);
  };
  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    router.push(logoutUrl);
  };
  const { cart, counter, getCart } = useCartStore();
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  console.log(cart);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Image
            src="/profile.png"
            alt="profile"
            width={22}
            height={22}
            className="cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent>
          <CardHeader>
            <CardTitle>
              <h1 className="text-xl pb-2 text-center">User Settings</h1>
            </CardTitle>
          </CardHeader>
          {loginStatus ? (
            <CardContent>
              <Button className="w-full justify-start" variant="ghost">
                Profile
              </Button>
              <Button
                className="w-full justify-start"
                variant="ghost"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </CardContent>
          ) : (
            <CardContent>
              <Button className="w-full justify-start" variant="ghost">
                <Link href="/login">Login or Register</Link>
              </Button>
            </CardContent>
          )}
        </PopoverContent>
      </Popover>

      <Image
        src="/notification.png"
        alt="notification"
        width={22}
        height={22}
      />
      <Popover>
        <PopoverTrigger>
          <div className="relative cursor-pointer">
            <Image src="/cart.png" alt="cart" width={22} height={22} />
            <div className="absolute -top-4 -right-4 w-5 h-5 bg-lama rounded-full text-white text-sm flex items-center justify-center">
              {counter}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="py-6 px-8">
          <CartModal />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NavIcons;
