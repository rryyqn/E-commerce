"use client";
import { Minus, Plus, ShoppingCart, TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CartModal = () => {
  const cartItems = true;
  const [quantity, setQuantity] = useState(1);

  //TEMPORARY
  const stock = 4;

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "inc" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };
  return (
    <Card className="w-max absolute p-4 rounded-md border bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cartItems ? (
        <CardContent className="flex gap-4">Cart is Empty</CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle>
              <h2 className="text-xl">Shopping Cart</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            {/* LIST  */}
            {/* ITEM */}
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/31133725/pexels-photo-31133725/free-photo-of-streetlamp-amidst-blooming-cherry-blossoms-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm font-semibold">
                      $49
                    </div>
                  </div>
                  {/* DESCRIPTION */}
                  <div className="text-sm text-gray-500">Available</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm items-center mt-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-gray-500 font-normal">Qty</Label>
                    <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-20">
                      <button
                        title="Decrease"
                        className="cursor-pointer"
                        onClick={() => handleQuantity("dec")}
                      >
                        <Minus size={10} />
                      </button>
                      {quantity}
                      <button
                        title="Increase"
                        className="cursor-pointer text-xl"
                        onClick={() => handleQuantity("inc")}
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <div>
              <div className="flex items-center justify-between font-semibold">
                <span>Subtotal</span>
                <span>$49</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <Button variant="outline">View Cart</Button>

                <Button className="bg-lama text-white hover:bg-white hover:ring-2 hover:ring-lama hover:text-lama transition-all">
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default CartModal;
