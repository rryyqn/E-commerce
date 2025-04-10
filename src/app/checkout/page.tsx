import CheckoutPage from "@/components/CheckoutPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Checkout",
};

const page = () => {
  return <CheckoutPage />;
};

export default page;
