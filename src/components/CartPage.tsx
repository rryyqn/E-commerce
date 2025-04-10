"use client";
import { TrashIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <Card className="rounded-md bg-white top-12 right-0 flex flex-col gap-6 p-5">
      <div>
        <CardHeader className="mb-4">
          <CardTitle>
            <h2 className="text-xl">Shopping Cart</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* LIST  */}
          {/* ITEM */}
          {cart?.lineItems?.length! <= 0 ? (
            <p className="text-gray-500">Cart is Empty</p>
          ) : (
            <>
              {cart.lineItems?.map((item) => (
                <div
                  className="flex gap-4 w-full overflow-hidden"
                  key={item._id}
                >
                  {item.image && (
                    <Image
                      src={wixMedia.getScaledToFillImageUrl(
                        item.image,
                        72,
                        96,
                        {}
                      )}
                      alt=""
                      width={72}
                      height={96}
                      className="object-cover rounded-md"
                    />
                  )}
                  <div className="flex flex-col justify-between w-full overflow-hidden">
                    {/* TOP */}
                    <div>
                      {/* TITLE */}
                      <div className="flex items-center justify-between gap-4 w-full">
                        <h3 className="font-semibold truncate overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.productName?.original}
                        </h3>
                        <div className="rounded-sm font-semibold flex items-center shrink-0 whitespace-nowrap">
                          {item.quantity && item.quantity > 1 && (
                            <span className="text-gray-500 font-normal flex items-center">
                              {item.quantity} <X className="h-4 w-4" />{" "}
                            </span>
                          )}
                          ${item.price?.amount}
                        </div>
                      </div>
                      {/* DESCRIPTION */}
                      <div className="text-sm text-gray-500">
                        {item.availability?.status === "AVAILABLE"
                          ? "Available"
                          : "Out of Stock"}
                      </div>
                    </div>
                    {/* BOTTOM */}
                    <div className="flex justify-between text-sm items-center mt-2">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-500 font-normal">
                          Qty {item.quantity}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeItem(wixClient, item._id!)}
                        style={{
                          cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          <Separator />
          {/* SUMMARY */}
          <div className="gap-1 flex flex-col">
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>
                $
                {cart?.lineItems
                  ?.reduce(
                    (total, item) =>
                      total +
                      (Number(item.price?.amount) || 0) *
                        (Number(item.quantity) || 1),
                    0
                  )
                  .toFixed(2) || "0.00"}
              </span>
            </div>
            <p className="text-gray-500 text-sm pb-2">
              Shipping calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <Button variant="outline">View Cart</Button>

              <Button
                className="bg-lama text-white hover:bg-white hover:ring-2 hover:ring-lama hover:text-lama transition-all disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading || cart?.lineItems?.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CartPage;
