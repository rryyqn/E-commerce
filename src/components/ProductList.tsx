import Image from "next/image";
import Link from "next/link";
import React from "react";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";

// Set how many products per page you want to display.
const productPerPage = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  // Initialize the product query
  let productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999);

  // Check if there's a sort parameter
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

  // Initialize an empty array to hold all products
  let allProducts: products.Product[] = [];
  let page = 0;
  let hasMore = true;

  // Fetch products page by page until all pages are fetched
  while (hasMore) {
    const res = await productQuery
      .skip(page * (limit || productPerPage))
      .limit(limit || productPerPage)
      .find();
    allProducts = [...allProducts, ...res.items];
    hasMore = res.hasNext();
    page++;
  }

  // Filter products based on price range if needed
  let filteredItems = allProducts.filter((product) => {
    const price = product.price?.discountedPrice || product.price?.price;
    return (
      price! >= (searchParams?.min || 0) &&
      price! <= (searchParams?.max || 999999)
    );
  });

  // Sort by price if requested
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

  return (
    <div className="sm:mt-12 mt-6">
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

export default ProductList;
