import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Charger explicitement les variables de ton fichier Vercel
dotenv.config({ path: '.env.local' });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL_PRISMA_DATABASE_URL,
    directUrl: process.env.DATABASE_URL_POSTGRES_URL,
  },
});