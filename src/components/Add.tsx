"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Check, Minus, Plus } from "lucide-react";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";

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
  const [addedToCart, setAddedToCart] = useState(false);

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "inc" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };
  const wixClient = useWixClient();

  const { addItem, isLoading } = useCartStore();

  const handleAddToCart = async () => {
    await addItem(wixClient, productId, variantId, quantity);
    setAddedToCart(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
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
            {stockNumber < 0 ? (
              <p>Out of stock.</p>
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
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || addedToCart}
          className={`mt-8 h-12 text-lg font-bold rounded-full w-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-100 ${
            addedToCart
              ? "bg-lama text-white ring-0"
              : "ring-lama ring-2 text-lama bg-transparent hover:bg-lama hover:text-white"
          }
          `}
        >
          {addedToCart ? (
            <span className="flex items-center">
              <Check size={20} />
              Added to Cart!
            </span>
          ) : (
            "Add To Cart"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Add;
