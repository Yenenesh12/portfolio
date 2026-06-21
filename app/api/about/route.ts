import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about || {});
  } catch (error) {
    console.error('About GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const existingAbout = await prisma.about.findFirst();
    
    let about;
    if (existingAbout) {
      about = await prisma.about.update({
        where: { id: existingAbout.id },
        data: {
          summary: data.summary,
          careerGoals: data.careerGoals,
          bio: data.bio,
        },
      });
    } else {
      about = await prisma.about.create({
        data: {
          summary: data.summary,
          careerGoals: data.careerGoals,
          bio: data.bio,
        },
      });
    }
    
    return NextResponse.json(about);
  } catch (error) {
    console.error('About POST error:', error);
    return NextResponse.json({ error: 'Failed to save about data' }, { status: 500 });
  }
}
