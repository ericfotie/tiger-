import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 1. RÉCUPÉRER (Public + Admin)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { date: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("❌ Erreur Prisma GET Projects:", error);
    return NextResponse.json({ error: "Impossible de lire les projets" }, { status: 500 });
  }
}

// 2. ENREGISTRER (Admin seulement)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.client) {
      return NextResponse.json({ error: "Désignation et Maître d'ouvrage requis" }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        title: body.title,
        client: body.client,
        type: body.type || "Génie Civil",
        description: body.description || "",
        images: Array.isArray(body.images) ? body.images : [],
        stars: 0
      }
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("❌ Erreur Prisma POST Project:", error);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement" }, { status: 500 });
  }
}

// ✅ 3. MODIFIER UN PROJET EXISTANT (PUT)
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) return NextResponse.json({ error: "ID de l'ouvrage requis" }, { status: 400 });

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        client: body.client,
        type: body.type,
        description: body.description,
        images: Array.isArray(body.images) ? body.images : undefined,
      }
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("❌ Erreur Prisma PUT Project:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour technique" }, { status: 500 });
  }
}

// 4. METTRE À JOUR LES STARS (PATCH)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;

    if (!id) return NextResponse.json({ error: "ID de l'ouvrage requis" }, { status: 400 });

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { stars: { increment: 1 } }
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("❌ Erreur Prisma PATCH Stars:", error);
    return NextResponse.json({ error: "Erreur lors du vote technique" }, { status: 500 });
  }
}

// 5. SUPPRIMER (Admin seulement)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: "ID requis pour la suppression" }, { status: 400 });

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "Dossier technique supprimé de la base Tiger"
    });
  } catch (error) {
    console.error("❌ Erreur Prisma DELETE Project:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du projet" }, { status: 500 });
  }
}