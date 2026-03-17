import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'PATCH') {
    try {
      const { id } = req.body;
      const updatedProject = await prisma.project.update({
        where: { id: id },
        data: { stars: { increment: 1 } }
      });
      return res.status(200).json(updatedProject);
    } catch (error) {
      return res.status(500).json({ error: "Impossible d'ajouter l'étoile" });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}