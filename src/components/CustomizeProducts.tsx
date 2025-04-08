"use client";
import React, { useEffect, useState } from "react";
import { products } from "@wix/stores";
import { Button } from "./ui/button";
import Add from "./Add";

const CustomizedProducts = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();
  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) {
        return false;
      }
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">{option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });
              const selected =
                selectedOptions[option.name!] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);

              return option.name === "Color" ? (
                <li
                  key={option.name}
                  className="w-8 h-8 rounded-full ring-1 ring-gray-200 relative transition-all duration-500"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                >
                  {selected ? (
                    <div className="absolute w-10 h-10 rounded-full ring-2 ring-[#BBBBBB] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500" />
                  ) : (
                    <div className="opacity-0 absolute w-10 h-10 rounded-full ring-2 ring-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500" />
                  )}
                  {disabled ? (
                    <div className="absolute w-12 h-[3px] bg-red-500 rounded-full rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/ transition-all duration-500" />
                  ) : (
                    <div className="opacity-0 absolute w-12 h-[3px] bg-red-500 rounded-full rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500" />
                  )}
                </li>
              ) : (
                <li>
                  <Button
                    variant={"outline"}
                    style={{
                      cursor: disabled ? "not-allowed" : "pointer",
                      color: disabled
                        ? "#CCCCCC"
                        : selected
                        ? "white"
                        : "black",
                      backgroundColor: selected
                        ? "#333333"
                        : disabled
                        ? "#f9F9F9"
                        : "white",
                    }}
                    onClick={clickHandler}
                  >
                    {choice.description}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={selectedVariant?._id || "00000000-0000-0000-000000000000"}
        stockNumber={selectedVariant?.stock?.quantity || 0}
        key={selectedVariant?._id || "default"}
      />
    </div>
  );
};

export default CustomizedProducts;
