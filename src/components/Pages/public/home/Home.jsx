"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Images from "@/components/parts/ImageCard/Images";
import { useGlobalAppContext } from "@/context/context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button, EmptyState } from "@/components/ui";
import { Data } from "@/assets/StaticData/Data";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations/variants";

const Home = () => {
  const {
    indexPage,
    setIndexPage,
    images,
    orientation,
    setOrientation,
    SearchImages,
  } = useGlobalAppContext();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);
  const lastScrollTime = useRef(0);

  const fetchData = useCallback(async () => {
    try {
      const response = await SearchImages();
      const newItems = response?.results || [];
      if (newItems.length === 0 && items.length === 0) {
        setIsError(true);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setHasMore(newItems.length > 0);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [indexPage, SearchImages, items.length]);

  const onScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < 300) return;
    lastScrollTime.current = now;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !isLoading) {
      setIndexPage((prev) => prev + 1);
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    // Reset items when filters change (keyword, orientation, color, order)
    setItems([]);
    setIsLoading(true);
    fetchData();
  }, [indexPage, orientation]); // Add other dependencies as needed

  // Prepare orientation options from Data
  const orientationOptions = Data.newData?.map((item) => ({
    value: item.value,
    label: item.label,
  })) || [];

  // Skeleton loader component
  const renderSkeletons = (count = 12) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-md">
            <Select value={orientation} onValueChange={setOrientation}>
              <SelectTrigger>
                <SelectValue placeholder="All orientations" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {orientationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isError && items.length === 0 ? (
          <EmptyState
            title="No images found"
            description="Try adjusting your search or filters to find what you're looking for."
            actionLabel="Clear Filters"
            onAction={() => {
              setOrientation("");
              setItems([]);
              setIsError(false);
            }}
          />
        ) : (
          <>
            {/* Image Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {items.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants} custom={index}>
                  <Images item={item} />
                </motion.div>
              ))}
            </motion.div>

            {/* Loading Indicator */}
            {isLoading && renderSkeletons(12)}

            {/* No more results */}
            {!hasMore && items.length > 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">You&apos;ve reached the end!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
