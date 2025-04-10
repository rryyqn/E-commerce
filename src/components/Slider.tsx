"use client";

const slides = [
  {
    id: 1,
    title: "SUMMER SALE",
    description: "SALE! UP TO 50% OFF!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/list?cat=featured",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    btn: "SHOP NOW",
  },
  {
    id: 2,
    title: "HOT RELEASES",
    description: "Shop our Newest Products",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/list?cat=new-products",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    btn: "EXPLORE NOW",
  },
  {
    id: 3,
    title: "TRENDING FASHION",
    description: "Discover the Latest Style",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/list?cat=featured",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    btn: "SEE TRENDING",
  },
];

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col sm:gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-4 text-center xl:px-20">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-6xl lg:text-6xl xl:text-[110px] font-black tracking-tight">
                {slide.title}
              </h1>
              <Link href={slide.url} className="mt-4">
                <Button className="font-semibold text-xl lg:text-2xl hover:bg-transparent hover:text-black hover:ring-2 ring-black transition-all h-auto py-3 px-10">
                  {slide.btn}
                </Button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4 -translate-x-1/2">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-black/50 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-black/75 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
