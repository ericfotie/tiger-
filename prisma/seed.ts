import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Charge les variables de .env.local pour avoir accès à DATABASE_URL
dotenv.config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// ✅ On injecte l'adapter comme l'exige Prisma 7
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Début du remplissage de la base Tiger Construction...');

  // Nettoyage optionnel pour éviter les doublons si tu relances le script
  await prisma.project.deleteMany();

  await prisma.project.create({
    data: {
      title: "Pont de la Sanaga",
      client: "Ministère des Travaux Publics",
      type: "Ouvrage d'art",
      description: "Étude structurelle et supervision du ferraillage pour un pont à poutres précontraintes.",
      stars: 5,
      images: ["https://images.unsplash.com/photo-1545139233-04e304919799?auto=format&fit=crop&q=80"]
    },
  });

  await prisma.project.create({
    data: {
      title: "Résidence R+4 Bastos",
      client: "SCI Tiger Invest",
      type: "Bâtiment",
      description: "Conception complète des plans d'exécution et calcul des descentes de charges.",
      stars: 4,
      images: ["https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80"]
    },
  });

  console.log('✅ Base de données mise à jour avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });