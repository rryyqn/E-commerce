import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

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

    if (sortType === "asc") {
      productQuery = productQuery.ascending(sortBy as "price" | "lastUpdated");
    } else if (sortType === "desc") {
      productQuery = productQuery.descending(sortBy as "price" | "lastUpdated");
    }
  }

  productQuery = productQuery.limit(limit || productPerPage);

  const res = await productQuery.find();

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {res.items.map((product: products.Product) => (
          <Link
            href={"/" + product.slug}
            className="flex flex-col gap-4"
            key={product._id}
          >
            <div className="relative w-full aspect-square">
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
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">${product.price?.price}</span>
            </div>
            {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections?.find(
                      (section: any) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              ></div>
            )}
            <Button className="ring-lama ring-2 rounded-full text-lama bg-transparent hover:bg-lama hover:text-white w-max">
              Add to Cart
            </Button>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      />
    </div>
  );
};

export default ProductList;
