// app/components/MyLottieComponent.tsx

"use client";

import * as animationData from "../../public/CheckAnimation.json";
import { useLottie } from "lottie-react";

const MyLottieComponent = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className="">
        <div className="w-32 h-32">{View}</div>
      </div>
    </>
  );
};

export default MyLottieComponent;
