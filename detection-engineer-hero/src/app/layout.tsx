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
                <nav className="fixed top-0 w-full z-50 bg-cyber-dark/80 backdrop-blur-sm border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <a href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-green to-blue-500">
                                    DETECTION HERO
                                </a>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a href="/foundations" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5 transition-colors">Foundations</a>
                                    <a href="/tools" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5 transition-colors">Tools</a>
                                    <a href="/engineering" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5 transition-colors">Engineering</a>
                                    <a href="/drill" className="text-cyber-green hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-cyber-green/20 transition-colors">Drill</a>
                                    <a href="/scenario" className="text-cyber-purple hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-cyber-purple/20 transition-colors">Scenario</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    );
}
