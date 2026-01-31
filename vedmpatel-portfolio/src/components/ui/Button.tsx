/**
 * @file Button.tsx
 * @description Reusable button component with multiple variants and sizes.
 * Supports both link-style and click-style buttons.
 */

'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Button component props
 */
interface ButtonProps {
    /** Button content (text, icons, etc.) */
    children: ReactNode;
    /** URL for link-style buttons */
    href?: string;
    /** Visual style variant */
    variant?: 'primary' | 'secondary';
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Click handler for button-style buttons */
    onClick?: () => void;
    /** Additional CSS classes */
    className?: string;
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
    variant = 'primary',
    size = 'md',
    onClick,
    className = '',
}: ButtonProps) {
    // Base styles applied to all buttons
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200';

    // Variant-specific styles
    const variants = {
        primary: 'bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25',
        secondary: 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700 hover:border-slate-600',
    };

    // Size-specific styles
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    // Render as Link if href is provided
    if (href) {
        return (
            <Link href={href} className={combinedStyles}>
                {children}
            </Link>
        );
    }

    // Render as button otherwise
    return (
        <button onClick={onClick} className={combinedStyles}>
            {children}
        </button>
    );
}
