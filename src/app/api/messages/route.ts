import { NextResponse } from 'next/server';
// ✅ Correction du chemin : on remonte de 3 niveaux (messages > api > app) pour atteindre src/lib
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 1. Lire les messages (Admin)
export async function GET() {
  try {
    // Vérification de la connexion à la base Tiger Construction
    const messages = await prisma.message.findMany({
      orderBy: { date: 'desc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("❌ Erreur Prisma GET Messages:", error);
    return NextResponse.json({ error: "Erreur lecture messages" }, { status: 500 });
  }
}

// 2. Envoyer un message (Visiteur)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // On s'assure que les données critiques sont présentes
    if (!body.whatsapp || !body.content) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        name: body.name,
        whatsapp: body.whatsapp,
        subject: body.subject,
        content: body.content,
        status: "nouveau"
      }
    });
    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("❌ Erreur Prisma POST Message:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}

// 3. Supprimer un message
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

  try {
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Message supprimé de la base" });
  } catch (error) {
    console.error("❌ Erreur Prisma DELETE Message:", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}