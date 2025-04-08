import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import React, { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();
  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* CAMPAIGN */}
      <div className="bg-pink-50 px-4 flex flex-col-reverse md:flex-row justify-between md:h-64 rounded-xl">
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center gap-4 p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[48px] text-gray-700 text-center -mb-2">
            Get up to 50% off on <br /> Selected Products
          </h1>
          <p className="text-gray-600 text-sm lg:text-md">Offers ends soon!</p>
          <Button className="bg-lama rounded-full text-white w-max text-xs lg:text-sm hover:bg-transparent hover:text-lama hover:ring-2 ring-lama transition-all">
            Browse Now
          </Button>
        </div>
        <div className="relative w-full md:w-1/3 h-64 md:h-auto mt-8 md:mt-0">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">{cat.collection?.name}</h1>
      <Suspense fallback={"loading"}>
        <ProductList
          categoryId={
            cat.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
