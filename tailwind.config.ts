import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#ffe4e6", // Blossom Pink
                    DEFAULT: "#fb7185", // Modern Pink
                    dark: "#e11d48",
                },
                secondary: {
                    light: "#fef3c7", // Cream
                    DEFAULT: "#f59e0b", // Gold
                    dark: "#b45309",
                },
                accent: {
                    light: "#dcfce7",
                    DEFAULT: "#22c55e",
                    dark: "#15803d",
                },
                bakery: {
                    cream: "#FFF5E1",
                    chocolate: "#3E2723",
                    gold: "#D4AF37",
                    pink: "#FFB6C1",
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                serif: ['var(--font-playfair)'],
                sans: ['var(--font-montserrat)'],
            }
        },
    },
    plugins: [],
};
export default config;
