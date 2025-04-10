import CategoryList from "@/components/CategoryList";
import ProductListPreview from "@/components/ProductListPreview";
import Slider from "@/components/Slider";
import Link from "next/link";
import { Suspense } from "react";

const HomePage = async () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link href="/list">
          <h1 className="text-5xl font-semibold">CATEGORIES</h1>
          <div className="w-[310px] h-[1px] bg-black mb-12 max-w-full"></div>
        </Link>
        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link href="/list">
          <h1 className="text-5xl font-semibold">FEATURED PRODUCTS</h1>
          <div className="w-[535px] h-[1px] max-w-full bg-black"></div>
        </Link>
        <Suspense fallback={"loading"}>
          <ProductListPreview
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            randomize={true}
          />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link href="/list">
          <h1 className="text-5xl font-semibold">NEW PRODUCTS</h1>
          <div className="w-[400px] h-[1px] bg-black max-w-full"></div>
        </Link>
        <ProductListPreview
          categoryId={process.env.NEW_PRODUCTS_CATEGORY_ID!}
          randomize={true}
        />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link href="/list">
          <h1 className="text-5xl font-semibold">MENS CLOTHING</h1>
          <div className="w-[400px] h-[1px] bg-black max-w-full"></div>
        </Link>
        <ProductListPreview
          categoryId={process.env.MENS_CLOTHING_CATEGORY_ID!}
          randomize={true}
        />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link href="/list">
          <h1 className="text-5xl font-semibold">WOMENS CLOTHING</h1>
          <div className="w-[400px] h-[1px] bg-black max-w-full"></div>
        </Link>
        <ProductListPreview
          categoryId={process.env.WOMENS_CLOTHING_CATEGORY_ID!}
          randomize={true}
        />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Link href="/list">
          <h1 className="text-5xl font-semibold">ACCESSORIES</h1>
          <div className="w-[400px] h-[1px] bg-black max-w-full"></div>
        </Link>
        <ProductListPreview
          categoryId={process.env.ACCESSORIES_CATEGORY_ID!}
          randomize={true}
        />
      </div>
    </div>
  );
};

export default HomePage;
