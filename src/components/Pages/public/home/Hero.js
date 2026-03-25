"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ComboBox } from "@/components/parts/SearchBlock/Search";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const trendingTags = ["Nature", "Animals", "Technology", "Travel", "Food", "Art"];

function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/homeback.avif"
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
              },
            },
          }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Main Heading */}
          <motion.h1
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
          >
            Discover Millions of{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Free Stock Photos
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Search from the world&apos;s best photographers. High-quality,
            royalty-free images shared by creators worldwide.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="max-w-3xl mx-auto pt-4"
          >
            <div className="relative">
              <ComboBox classes="w-full shadow-2xl" />
            </div>
          </motion.div>

          {/* Trending Tags */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
            }}
            className="flex flex-wrap items-center justify-center gap-3 pt-4"
          >
            <span className="text-white/70 text-sm font-medium">Trending:</span>
            {trendingTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 cursor-pointer transition-colors text-xs md:text-sm"
              >
                {tag}
              </Badge>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.6 } },
            }}
            className="pt-8"
          >
            <Button asChild size="lg" className="group">
              <Link href="/search" className="flex items-center gap-2">
                Explore Popular
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}

export default HeroSection;
