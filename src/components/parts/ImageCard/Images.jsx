"use client";

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FaHeart, FaDownload, FaPlus } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGlobalAppContext } from "@/context/context";
import { Card, CardContent, Avatar, Button, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import InvokeAPI from "@/lib/network/invokeapi/invokeapi";

const Images = ({ item }) => {
  const {
    reqParam,
    setImageId,
    openModal,
    setRelated,
    image,
    setImage,
  } = useGlobalAppContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const createQueryString = useCallback(
    (obj) => {
      const params = new URLSearchParams(searchParams);
      Object.keys(obj).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
          params.set(key, obj[key]);
        }
      });
      openModal();
      return params.toString();
    },
    [searchParams, openModal]
  );

  const param = useSearchParams();
  const id = param.get("id");

  const getImage = async () => {
    if (!id) return;
    const res = await InvokeAPI(`photos/${id}`, "get", "", "", reqParam);
    setImage(res);
  };

  const getRelated = async () => {
    if (!id) return;
    const res = await InvokeAPI(`photos/${id}/related`, "get", "", "", reqParam);
    setRelated(res);
  };

  useEffect(() => {
    if (id) {
      getImage();
      getRelated();
    }
  }, [id]);

  return (
    <Card
      className="group relative overflow-hidden rounded-xl border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() =>
        router.push(
          pathname + "?" + createQueryString({
            id: item.id,
            slug: item.slug,
            alt_description: item.alt_description,
            author: item.user.username,
            author_id: item.user.id,
          })
        )
      }
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={item.urls.regular}
            alt={item.alt_description || "Stock photo"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
          />
          {/* Skeleton while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer" />
          )}

          {/* Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-between p-4"
              >
                {/* Top Actions */}
                <div className="flex justify-end gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                        aria-label="Like photo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaHeart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Like photo</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                        aria-label="Add to collection"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaPlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Add to collection</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Bottom Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={item.user.profile_image?.large}
                      alt={`${item.user.name}'s profile`}
                      size="sm"
                      fallback={item.user.name?.charAt(0)}
                    />
                    <span className="text-white text-sm font-medium truncate max-w-[120px]">
                      {item.user.name}
                    </span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Download photo"
                      >
                        <FaDownload className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Download photo</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default Images;
