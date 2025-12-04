import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                cyber: {
                    green: "#00ff41",
                    purple: "#bc13fe",
                    dark: "#0d0221",
                    gray: "#2a2a2a"
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glitch": "glitch 1s linear infinite",
                "scanline": "scanline 8s linear infinite",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                glitch: {
                    "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
                    "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
                    "62%": { transform: "translate(0,0) skew(5deg)" },
                },
                scanline: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
