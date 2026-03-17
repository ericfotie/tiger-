import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  // GET : Tout le monde voit les projets
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({ orderBy: { date: 'desc' } });
    return res.status(200).json(projects);
  }

  // POST : L'admin ajoute un nouveau projet
  if (req.method === 'POST') {
    const newProject = await prisma.project.create({ data: req.body });
    return res.status(201).json(newProject);
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}