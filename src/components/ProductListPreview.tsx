import Image from "next/image";
import Link from "next/link";
import React from "react";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";

const productPerPage = 8;

const ProductListPreview = async ({
  categoryId,
  limit,
  searchParams,
  randomize = false,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
  randomize?: boolean;
}) => {
  const wixClient = await wixClientServer();
  let productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || productPerPage)
        : 0
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split("-");

    if (sortBy !== "price") {
      if (sortType === "asc") {
        productQuery = productQuery.ascending(sortBy as "lastUpdated");
      } else if (sortType === "desc") {
        productQuery = productQuery.descending(sortBy as "lastUpdated");
      }
    }
  }

  if (randomize) {
    productQuery = productQuery.limit(Math.max(16, limit || productPerPage));
  } else {
    productQuery = productQuery.limit(limit || productPerPage);
  }

  const res = await productQuery.find();

  let filteredItems = res.items.filter((product) => {
    const price = product.price?.discountedPrice || product.price?.price;
    if (!price) return false;
    return (
      price >= (searchParams?.min || 0) &&
      price <= (searchParams?.max || 999999)
    );
  });

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split("-");

    if (sortBy === "price") {
      filteredItems.sort((a, b) => {
        const priceA = a.price?.discountedPrice || a.price?.price || 0;
        const priceB = b.price?.discountedPrice || b.price?.price || 0;

        return sortType === "asc" ? priceA - priceB : priceB - priceA;
      });
    }
  }

  if (randomize) {
    filteredItems = shuffleArray([...filteredItems]);
    filteredItems = filteredItems.slice(0, 4);
  }

  return (
    <div className="mt-12">
      {filteredItems.length === 0 && (
        <h1 className="flex justify-center font-semibold text-xl">
          No products found
        </h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filteredItems.map((product: products.Product) => (
          <Link
            href={"/" + product.slug}
            className="flex flex-col gap-4"
            key={product._id}
          >
            <div className="relative w-full aspect-square">
              {product.ribbon && (
                <div className="absolute top-2 right-2 bg-lama rounded-full text-white px-3 py-1 text-xs z-20">
                  {product.ribbon}
                </div>
              )}
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt={product.name || "Product image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
                  alt={`${product.name || "Product"} alternative view`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between gap-2">
              <span className="font-medium truncate">{product.name}</span>
              <span className="font-semibold">
                $
                {(product.price?.discountedPrice &&
                  product.price.discountedPrice) ||
                  product.price?.price}
              </span>
            </div>
            {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description || ""),
                }}
              ></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default ProductListPreview;
