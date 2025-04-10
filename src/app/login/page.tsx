import LoginPage from "@/components/LoginPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account",
};

const page = () => {
  return <LoginPage />;
};

export default page;
