import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Experience GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const experience = await prisma.experience.create({
      data: {
        role: data.role,
        company: data.company,
        duration: data.duration,
        description: data.description,
        responsibilities: data.responsibilities || [],
        location: data.location || null,
        type: data.type || null,
        technologies: data.technologies || [],
      },
    });
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Experience POST error:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, _id, ...data } = await request.json();
    const experienceId = id || _id;
    
    const experience = await prisma.experience.update({
      where: { id: experienceId },
      data: {
        role: data.role,
        company: data.company,
        duration: data.duration,
        description: data.description,
        responsibilities: data.responsibilities || [],
        location: data.location || null,
        type: data.type || null,
        technologies: data.technologies || [],
      },
    });
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Experience PUT error:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await prisma.experience.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Experience DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
