import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const where = category && category !== 'all' ? { category } : {};
    
    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        technologies: data.technologies || [],
        image: data.image,
        githubLink: data.githubLink,
        liveLink: data.liveLink,
        featured: data.featured || false,
        category: data.category,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Projects POST error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, _id, ...data } = await request.json();
    const projectId = id || _id;
    
    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: data.title,
        description: data.description,
        technologies: data.technologies || [],
        image: data.image,
        githubLink: data.githubLink,
        liveLink: data.liveLink,
        featured: data.featured || false,
        category: data.category,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Projects PUT error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Projects DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
