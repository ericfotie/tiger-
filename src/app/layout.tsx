import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ✅ On utilise des chemins relatifs pour éviter l'erreur de module sur Ubuntu
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tiger Construction | Expertise Génie Civil",
  description: "Bureau d'études et réalisation d'infrastructures au Cameroun.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-[#0F172A] antialiased pt-20`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}