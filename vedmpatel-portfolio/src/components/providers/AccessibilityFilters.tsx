export default function AccessibilityFilters() {
    return (
        <svg className="hidden" aria-hidden="true">
            <defs>
                {/* Protanopia (Red-Blind) */}
                <filter id="protanopia">
                    <feColorMatrix
                        type="matrix"
                        values="0.567, 0.433, 0,     0, 0
                    0.558, 0.442, 0,     0, 0
                    0,     0.242, 0.758, 0, 0
                    0,     0,     0,     1, 0"
                    />
                </filter>

                {/* Deuteranopia (Green-Blind) */}
                <filter id="deuteranopia">
                    <feColorMatrix
                        type="matrix"
                        values="0.625, 0.375, 0,   0, 0
                    0.7,   0.3,   0,   0, 0
                    0,     0.3,   0.7, 0, 0
                    0,     0,     0,   1, 0"
                    />
                </filter>

                {/* Tritanopia (Blue-Blind) */}
                <filter id="tritanopia">
                    <feColorMatrix
                        type="matrix"
                        values="0.95, 0.05,  0,     0, 0
                    0,    0.433, 0.567, 0, 0
                    0,    0.475, 0.525, 0, 0
                    0,    0,     0,     1, 0"
                    />
                </filter>

                {/* Achromatopsia (Monochromacy) */}
                <filter id="achromatopsia">
                    <feColorMatrix
                        type="matrix"
                        values="0.299, 0.587, 0.114, 0, 0
                    0.299, 0.587, 0.114, 0, 0
                    0.299, 0.587, 0.114, 0, 0
                    0,     0,     0,     1, 0"
                    />
                </filter>

                {/* High Contrast */}
                <filter id="high-contrast">
                    <feComponentTransfer>
                        <feFuncR type="linear" slope="1.2" intercept="-0.1" />
                        <feFuncG type="linear" slope="1.2" intercept="-0.1" />
                        <feFuncB type="linear" slope="1.2" intercept="-0.1" />
                    </feComponentTransfer>
                </filter>
            </defs>
        </svg>
    );
}
