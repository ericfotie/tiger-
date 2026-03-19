import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configuration pour Tiger Construction */

  // 1. Autoriser les images lourdes (Base64 des chantiers)
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Augmente la limite à 10 Mo pour tes photos
    },
  },

  // 2. Configuration des images (si tu utilises des URLs externes plus tard)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // 3. Optionnel : Ignorer les erreurs de déploiement si tu as des soucis de types mineurs
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;