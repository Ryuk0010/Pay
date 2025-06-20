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
      text: "Payfied",
      className: "text-blue-500 dark:text-violet-500",
    },

  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-violet-600 text-2xl mb-10">
        From Effiency to Security to Trust
      </p>
      <TypewriterEffect words={words} />
    </div>
  );
}
