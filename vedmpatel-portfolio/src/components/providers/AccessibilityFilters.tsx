/**
 * @file AccessibilityFilters.tsx
 * @description Previously contained SVG filters for color blindness simulation.
 * Now deprecated - we use pure CSS filters for better mobile performance.
 * This component is kept for backwards compatibility but returns null.
 */
export default function AccessibilityFilters() {
    // SVG filters removed - now using CSS-only filters for performance
    // CSS filters (hue-rotate, saturate, sepia) are GPU-accelerated
    // and much lighter on mobile devices
    return null;
}

