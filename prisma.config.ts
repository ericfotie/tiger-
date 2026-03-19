import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// 1. Chargement explicite du .env.local (indispensable pour Prisma en local sur Ubuntu)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export default defineConfig({
  datasource: {
    // URL via le Pooler (utilisée par l'application en prod)
    url: process.env.DATABASE_URL_PRISMA_DATABASE_URL || process.env.DATABASE_URL,

    // URL directe (utilisée pour le provisionnement et les migrations)
    directUrl: process.env.DATABASE_URL_POSTGRES_URL || process.env.DIRECT_URL,
  },
});