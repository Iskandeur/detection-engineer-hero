import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Detection Engineer Hero",
    description: "Master the Art of Detection Engineering",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${inter.className} scanline bg-cyber-dark text-white min-h-screen`}>
                {children}
            </body>
        </html>
    );
}
