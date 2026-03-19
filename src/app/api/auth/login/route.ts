import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // On compare avec ce qu'on a mis dans .env.local
    if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });

      // On crée un cookie "Badge" sécurisé
      response.cookies.set('tiger_auth', 'true', {
        httpOnly: true, // Invisible pour les pirates
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // Valide 24h
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: "Code invalide" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur technique" }, { status: 500 });
  }
}