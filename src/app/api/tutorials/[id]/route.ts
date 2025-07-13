import { NextResponse } from 'next/server';
import db from '@/lib/firebase-admin';
import { Tutorial } from '@/lib/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const docRef = db.collection('tutorials').doc(params.id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ message: 'Tutorial not found' }, { status: 404 });
    }

    const tutorial: Tutorial = { id: docSnap.id, ...docSnap.data() } as Tutorial;
    return NextResponse.json(tutorial);
  } catch (error) {
    console.error("Error fetching tutorial: ", error);
    return NextResponse.json({ message: 'Failed to fetch tutorial' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { title, slug, description, content } = body;

        if (!title || !slug || !description || !content) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const docRef = db.collection('tutorials').doc(params.id);
        await docRef.update({
            title,
            slug,
            description,
            content,
        });

        return NextResponse.json({ message: 'Tutorial updated successfully' });
    } catch (error) {
        console.error("Error updating tutorial: ", error);
        return NextResponse.json({ message: 'Failed to update tutorial' }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.collection('tutorials').doc(params.id).delete();
    return NextResponse.json({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    console.error("Error deleting tutorial: ", error);
    return NextResponse.json({ message: 'Failed to delete tutorial' }, { status: 500 });
  }
}
