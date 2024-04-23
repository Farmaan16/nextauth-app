"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import Link from "next/link";

export function HomePage() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-6xl font-bold text-stone-800 dark:text-neutral-400  text-center">
          Welcome to NextAuth-App
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Your streamlined solution for seamless authentication integration.
        </div>

        <div>
          <Link
            href="/login"
            className="ml-4 bg-black dark:bg-inherit rounded-full w-fit text-white dark:text-neutral-300 px-5 py-2 font-bold border border-neutral-600 hover:bg-zinc-900"
          >
            {" "}
            Login
          </Link>
          <Link
            href="/signup"
            className="ml-4 bg-black dark:bg-inherit rounded-full w-fit text-white dark:text-neutral-300 px-4 py-2 font-bold border border-neutral-600 hover:bg-zinc-900"
          >
            Signup
          </Link>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default HomePage;
