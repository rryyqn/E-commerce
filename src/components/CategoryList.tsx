import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div className="">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-8 mb-8">
        {cats.items.slice(0, 4).map((item) => (
          <Link href={`/list?cat=${item.slug}`} className="" key={item._id}>
            <div className="relative bg-slate-100 w-full h-60">
              <Image
                src={item.media?.mainMedia?.image?.url || "/cat.png"}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-3 text-xl">{item.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
