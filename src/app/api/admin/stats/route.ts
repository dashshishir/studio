
import { NextResponse } from 'next/server';
import db from '@/lib/firebase-admin';

export async function GET() {
  // In a real app, you'd want to protect this endpoint
  // to ensure only admins can access it.
  try {
    const usersSnapshot = await db.collection('users').count().get();
    const tutorialsSnapshot = await db.collection('tutorials').count().get();
    const glossarySnapshot = await db.collection('glossary').count().get();

    const stats = {
      userCount: usersSnapshot.data().count,
      tutorialCount: tutorialsSnapshot.data().count,
      glossaryCount: glossarySnapshot.data().count,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats: ", error);
    return NextResponse.json({ message: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
