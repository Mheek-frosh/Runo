import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: '--font-montserrat',
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: "Runo's Oven | Delicious Cakes & Treats",
    description: "Baking memories, one treat at a time. Order your favorite cakes and treats from Runo's Oven.",
    icons: {
        icon: '/assets/runologo.png',
        apple: '/assets/runologo.png',
    },
    openGraph: {
        images: ['/assets/runologo.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
