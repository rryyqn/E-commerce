import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div className="">
      <div className="sm:grid-cols-4 sm:gap-0 mb-8 hidden sm:grid">
        {cats.items.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="relative"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full h-60">
              <Image
                src={item.media?.mainMedia?.image?.url || "/cat.png"}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent h-16"></div>
            </div>
            <h1 className="absolute bottom-3 left-3 text-xl text-white font-medium">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
      <div className="sm:hidden grid grid-cols-2 gap-0 mb-8">
        {[cats.items[0], cats.items[1], cats.items[4], cats.items[7]].map(
          (item) => (
            <Link
              href={`/list?cat=${item.slug}`}
              className="relative"
              key={item._id}
            >
              <div className="relative bg-slate-100 w-full h-60">
                <Image
                  src={item.media?.mainMedia?.image?.url || "/cat.png"}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent h-16"></div>
              </div>
              <h1 className="absolute bottom-3 left-3 text-xl text-white font-medium">
                {item.name}
              </h1>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryList;
