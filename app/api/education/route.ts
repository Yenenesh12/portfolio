import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error('Education GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const education = await prisma.education.create({
      data: {
        institution: data.institution,
        degree: data.degree,
        year: data.year,
        description: data.description,
      },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error('Education POST error:', error);
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, _id, ...data } = await request.json();
    const educationId = id || _id;
    
    const education = await prisma.education.update({
      where: { id: educationId },
      data: {
        institution: data.institution,
        degree: data.degree,
        year: data.year,
        description: data.description,
      },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error('Education PUT error:', error);
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await prisma.education.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Education DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 });
  }
}
