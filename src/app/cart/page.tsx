import CartPage from "@/components/CartPage";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

const page = () => {
  return (
    <div className="px-4 md:px-[200px] lg:px-[300px] xl:px-[500px] h-[calc(100vh-80px)] py-10">
      <CartPage />
    </div>
  );
};

export default page;
