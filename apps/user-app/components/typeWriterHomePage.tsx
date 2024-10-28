"use client";

import { TypewriterEffect } from "./typewriter-effect";


export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Transfer",
    },
    {
      text: "Money",
    },
    {
        text: "with",
    },
    {
      text: "Big",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "Pocket.",
        className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-neutral-600 text-base  mb-10">
        From Effiency to Security to Trust
      </p>
      <TypewriterEffect words={words} />
    </div>
  );
}
