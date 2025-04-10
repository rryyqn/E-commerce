import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { Separator } from "@/components/ui/separator";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  const product = products.items[0];

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
  };
}
const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        {product.additionalInfoSections?.find(
          (section) => section.title === "Rating"
        )?.description && (
          <div
            className="flex items-center gap-1 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                product.additionalInfoSections.find(
                  (section) => section.title === "Rating"
                )?.description || ""
              ),
            }}
          />
        )}
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-semibold text-2xl">${product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-lg text-gray-500 line-through">
              ${product.price?.price}
            </h3>
            <h2 className="font-semibold text-2xl">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}

        <Separator decorative />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <Accordion type="multiple">
          {product.additionalInfoSections?.map((section: any) => (
            <AccordionItem value={section.title} key={section.title}>
              <AccordionTrigger>
                <div
                  className="font-medium mb-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(section.title || ""),
                  }}
                ></div>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="[&>ul]:list-disc [&>ul]:ml-6 [&>ul>li]:mt-2 leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(section.description || ""),
                  }}
                ></div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default SinglePage;
