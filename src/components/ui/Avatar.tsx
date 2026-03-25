"use client";

import React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = "Avatar", fallback, size = "md", ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    const getFallback = () => {
      if (fallback) return fallback;
      if (alt) return alt.charAt(0).toUpperCase();
      return "?";
    };

    return (
      <div
        ref={ref}
        className={`relative rounded-full overflow-hidden bg-muted flex items-center justify-center font-medium ${sizeClasses[size]} ${className || ""}`}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="text-foreground">{getFallback()}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
