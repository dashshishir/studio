import { NextResponse } from 'next/server';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Tutorial } from '@/lib/types';

export async function GET() {
  try {
    const tutorialsCol = collection(db, 'tutorials');
    const tutorialSnapshot = await getDocs(tutorialsCol);
    const tutorials: Tutorial[] = tutorialSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Tutorial));
    return NextResponse.json(tutorials);
  } catch (error) {
    console.error("Error fetching tutorials: ", error);
    return NextResponse.json({ message: 'Failed to fetch tutorials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, description, content, author } = body;

    if (!title || !slug || !description || !content || !author) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    const newTutorial = {
        title,
        slug,
        description,
        content,
        author,
        publishedDate: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'tutorials'), newTutorial);
    return NextResponse.json({ id: docRef.id, ...newTutorial }, { status: 201 });
  } catch (error) {
    console.error("Error creating tutorial: ", error);
    return NextResponse.json({ message: 'Failed to create tutorial' }, { status: 500 });
  }
}
