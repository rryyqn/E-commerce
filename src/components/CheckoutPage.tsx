"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const wixClient = useWixClient();
  const { cart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "credit-card",
    // Credit Card Fields
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    nameOnCard: "",
    // PayPal Fields
    paypalEmail: "",
    // Bank Transfer Fields
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountName: "",
    expiry: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    // Format as MM/YY
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setFormData((prev) => ({ ...prev, expiry: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const deliveryFee = 5.99;
  const subtotal =
    cart?.lineItems?.reduce(
      (total, item) =>
        total +
        (Number(item.price?.amount) || 0) * (Number(item.quantity) || 1),
      0
    ) || 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing time
    setTimeout(() => {
      // Navigate to success page with order details
      router.push(
        `/checkout/success?name=${encodeURIComponent(
          formData.name
        )}&email=${encodeURIComponent(formData.email)}&total=${total.toFixed(
          2
        )}&address=${encodeURIComponent(
          `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
        )}`
      );
    }, 1000);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:flex lg:flex-row-reverse">
        {/* Order Summary - Now will appear first on mobile */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border lg:sticky lg:top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cart?.lineItems?.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    {item.image && (
                      <Image
                        src={wixMedia.getScaledToFillImageUrl(
                          item.image,
                          60,
                          80,
                          {}
                        )}
                        alt=""
                        width={60}
                        height={80}
                        className="object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">
                          {item.productName?.original}
                        </h3>
                        <span className="font-medium">
                          ${Number(item.price?.amount).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs justify-center text-gray-500">
                <Lock className="h-3 w-3 text-gray-500" /> Secure Checkout
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">
                Customer Information
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">
                Delivery Information
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Postcode</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="Postcode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <p className="text-gray-600 font-medium text-sm flex items-center gap-2 mb-4">
                <Lock className="h-4 w-4 text-green-" />
                Checkout securely with VISA, Mastercard, or Paypal.
              </p>

              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={handlePaymentMethodChange}
                className="space-y-3"
              >
                <Label
                  htmlFor="credit-card"
                  className="flex items-center space-x-2 border px-3 h-11 rounded-md justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <span className="flex items-center gap-1">Credit Card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png"
                      alt="Visa Logo"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="https://www.mastercard.com/content/dam/public/brandcenter/assets/images/logos/mclogo-for-footer.svg"
                      alt="Mastercard Logo"
                      width={20}
                      height={20}
                    />
                  </div>
                </Label>
                <Label
                  htmlFor="paypal"
                  className="flex items-center space-x-2 border px-3 h-11 rounded-md justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <span className="flex items-center gap-1">PayPal</span>
                  </div>
                  <Image
                    src="https://www.paypalobjects.com/marketing/web/logos/paypal-mark-color.svg"
                    alt="PayPal Logo"
                    width={20}
                    height={20}
                  />
                </Label>
              </RadioGroup>

              <div className="mt-4 space-y-4">
                {formData.paymentMethod === "credit-card" && (
                  <>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        name="nameOnCard"
                        placeholder="Full Name"
                        required
                      />
                      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        <div className="col-span-1">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                            maxLength={5}
                            value={formData.expiry}
                            onChange={handleExpiryChange}
                            required
                          />
                        </div>

                        <div className="col-span-1">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="XXX"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {formData.paymentMethod === "paypal" && (
                  <div>
                    <Button variant="outline" className="w-full py-5 h-auto">
                      <Label htmlFor="paypal">Pay with PayPal</Label>
                      <Image
                        src="https://www.paypalobjects.com/marketing/web/logos/paypal-mark-color.svg"
                        alt="PayPal Logo"
                        width={20}
                        height={20}
                      />
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-lama text-white hover:bg-white hover:ring-2 hover:ring-lama hover:text-lama transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Complete Order"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
