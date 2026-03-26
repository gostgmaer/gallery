"use client";

import React from "react";
import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "warning" | "success" | "info";
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, children, dismissible, onDismiss, ...props }, ref) => {
    const variants = {
      default: "bg-background text-foreground border",
      destructive: "border-destructive/50 text-destructive bg-destructive/10",
      warning: "border-warning/50 text-warning bg-warning/10",
      success: "border-success/50 text-success bg-success/10",
      info: "border-primary/50 text-primary bg-primary/10",
    };

    const icons = {
      default: null,
      destructive: <FaExclamationCircle className="h-4 w-4" />,
      warning: <FaExclamationTriangle className="h-4 w-4" />,
      success: <FaCheckCircle className="h-4 w-4" />,
      info: <FaInfoCircle className="h-4 w-4" />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`relative rounded-lg border px-4 py-3 ${variants[variant]} ${className || ""}`}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icons[variant] && (
            <span className="mt-0.5 shrink-0">{icons[variant]}</span>
          )}
          <div className="flex-1">
            {title && <h5 className="mb-1 font-semibold">{title}</h5>}
            <div className="text-sm opacity-90">{children}</div>
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className="ml-auto -m-1.5 rounded-md p-1.5 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

// AlertTitle subcomponent
interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={`mb-1 font-semibold ${className || ""}`}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

// AlertDescription subcomponent
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm opacity-90 ${className || ""}`}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
