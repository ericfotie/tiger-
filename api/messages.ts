import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  // GET : Pour que l'admin puisse lire les messages
  if (req.method === 'GET') {
    try {
      const messages = await prisma.message.findMany({
        orderBy: { date: 'desc' }
      });
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ error: "Erreur de récupération" });
    }
  }

  // POST : Pour enregistrer un nouveau message client
  if (req.method === 'POST') {
    try {
      const { name, email, subject, content } = req.body;
      const newMessage = await prisma.message.create({
        data: { name, email, subject, content }
      });
      return res.status(201).json(newMessage);
    } catch (error) {
      return res.status(500).json({ error: "Erreur d'envoi du message" });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}