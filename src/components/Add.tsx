"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "inc" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Quantity</h4>
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-28">
            <button
              title="Decrease"
              className="cursor-pointer"
              onClick={() => handleQuantity("dec")}
            >
              <Minus size={16} />
            </button>
            {quantity}
            <button
              title="Increase"
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("inc")}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="text-sm">
            {stockNumber >= 20 ? (
              <p>{stockNumber} in stock</p>
            ) : (
              stockNumber > 0 &&
              stockNumber <= 10 &&
              "Don't miss out!" && (
                <p>
                  <span className="text-lama">{stockNumber} items</span> in
                  stock. Don&apos;t miss out!
                </p>
              )
            )}
          </div>
        </div>
        <Button className="mt-8 h-12 text-lg font-bold ring-lama ring-2 rounded-full text-lama  bg-transparent hover:bg-lama hover:text-white w-full disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white disabled:ring-none">
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default Add;
