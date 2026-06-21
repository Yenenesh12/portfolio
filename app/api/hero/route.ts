import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst();
    
    if (!hero) {
      return NextResponse.json({});
    }
    
    // Transform response to match frontend expectations
    const response = {
      ...hero,
      socialLinks: {
        github: hero.githubLink || '',
        linkedin: hero.linkedinLink || '',
        email: hero.email || '',
      },
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Hero GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch hero data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    console.log('Received hero data:', data);
    
    const existingHero = await prisma.hero.findFirst();
    
    console.log('Existing hero:', existingHero);
    
    let hero;
    if (existingHero) {
      hero = await prisma.hero.update({
        where: { id: existingHero.id },
        data: {
          fullName: data.fullName,
          professionalTitle: data.professionalTitle,
          tagline: data.tagline,
          profileImage: data.profileImage || '',
          resumeLink: data.resumeLink || '',
          githubLink: data.socialLinks?.github || null,
          linkedinLink: data.socialLinks?.linkedin || null,
          email: data.socialLinks?.email || null,
        },
      });
      console.log('Updated hero:', hero);
    } else {
      hero = await prisma.hero.create({
        data: {
          fullName: data.fullName,
          professionalTitle: data.professionalTitle,
          tagline: data.tagline,
          profileImage: data.profileImage || '',
          resumeLink: data.resumeLink || '',
          githubLink: data.socialLinks?.github || null,
          linkedinLink: data.socialLinks?.linkedin || null,
          email: data.socialLinks?.email || null,
        },
      });
      console.log('Created hero:', hero);
    }
    
    // Transform response to match frontend expectations
    const response = {
      ...hero,
      socialLinks: {
        github: hero.githubLink || '',
        linkedin: hero.linkedinLink || '',
        email: hero.email || '',
      },
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Hero POST error:', error);
    return NextResponse.json({ 
      error: 'Failed to save hero data', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
