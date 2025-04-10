import SuccessPage from "@/components/SuccessPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Order Confirmed!",
};

const page = () => {
  return <SuccessPage />;
};

export default page;
