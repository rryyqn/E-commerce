"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const total = searchParams.get("total") || "0.00";
  const address = searchParams.get("address") || "";

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 flex flex-col items-center">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <Card className="p-8">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Order Confirmed!</h1>
            <p className="text-gray-500">
              Thank you for your purchase. We&apos;ve sent a confirmation email
              with your order details.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="p-4 rounded-md">
              <h2 className="font-semibold text-lg mb-2">Order Details</h2>

              <div className="space-y-2">
                <div className="grid grid-cols-3">
                  <span className="text-gray-500 col-span-1">Name:</span>
                  <span className="col-span-2 font-medium">{name}</span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-gray-500 col-span-1">Email:</span>
                  <span className="col-span-2 font-medium">{email}</span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-gray-500 col-span-1">Total:</span>
                  <span className="col-span-2 font-medium">${total}</span>
                </div>

                <Separator className="my-2" />

                <div className="grid grid-cols-3">
                  <span className="text-gray-500 col-span-1">Delivery:</span>
                  <span className="col-span-2 font-medium">{address}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="font-semibold text-lg mb-2">What&apos;s Next?</h2>
              <p className="text-gray-600">
                You&apos;ll receive an email confirmation shortly. We&apos;ll
                notify you when your order ships.
              </p>
            </div>
          </CardContent>

          <CardFooter className="mt-4">
            <Link href="/" className="w-full">
              <Button className="w-full bg-lama text-white hover:bg-white hover:ring-2 hover:ring-lama hover:text-lama transition-all">
                Continue Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
