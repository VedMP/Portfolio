/**
 * @file Button.tsx
 * @description Reusable button component with multiple variants and sizes.
 * Supports both link-style and click-style buttons.
 *
 * Server Component — no hooks or browser APIs are used here, so "use client"
 * is not needed. The onClick prop is valid in a Server Component; the client
 * boundary is only introduced where event handlers are actually wired up.
 */

import Link from "next/link";
import { ReactNode } from "react";

/**
 * Button component props
 */
interface ButtonProps {
  /** Button content (text, icons, etc.) */
  children: ReactNode;
  /** URL for link-style buttons */
  href?: string;
  /** Visual style variant */
  variant?: "primary" | "secondary";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Click handler for button-style buttons */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Link target (e.g., "_blank" for new tab) */
  target?: string;
  /** Link rel attribute (e.g., "noopener noreferrer") */
  rel?: string;
}

/**
 * Button Component
 *
 * A versatile button component that renders as either a Next.js Link
 * or a native button element based on the presence of an href prop.
 *
 * @example
 * // Link button
 * <Button href="/contact" variant="primary" size="lg">Contact Me</Button>
 *
 * @example
 * // Click button
 * <Button onClick={handleClick} variant="secondary">Submit</Button>
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  target,
  rel,
}: ButtonProps) {
  // Base styles applied to all buttons
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900";

  // Variant-specific styles
  const variants = {
    primary:
      "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 shadow-lg shadow-blue-500/25",
    secondary:
      "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600",
  };

  // Size-specific styles
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // Check if href is an external protocol (mailto:, tel:, etc.)
  const isExternalProtocol = href?.startsWith("mailto:") || href?.startsWith("tel:");

  // Render as native anchor for external links, protocols (mailto:, tel:), or target="_blank"
  if (href && (target === "_blank" || isExternalProtocol)) {
    // Security: Ensure target="_blank" has rel="noopener noreferrer"
    let safeRel = rel;
    if (target === "_blank") {
      if (!safeRel) {
        safeRel = "noopener noreferrer";
      } else {
        if (!safeRel.includes("noopener")) safeRel += " noopener";
        if (!safeRel.includes("noreferrer")) safeRel += " noreferrer";
      }
    }

    return (
      <a href={href} className={combinedStyles} target={target} rel={safeRel}>
        {children}
      </a>
    );
  }

  // Render as Next.js Link for internal navigation
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  // Render as button otherwise
  return (
    <button type="button" onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
