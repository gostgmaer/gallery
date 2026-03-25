"use client";

import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, rounded = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`animate-pulse bg-muted ${rounded ? "rounded" : ""} ${className || ""}`}
        style={{
          width: width,
          height: height,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
