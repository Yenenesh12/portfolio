// app/api/upload/route.ts
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!type || !['image', 'resume'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Validate file type based on upload type
    if (type === 'image') {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid image format. Please upload JPG, PNG, GIF, or WebP.' },
          { status: 400 }
        );
      }
      
      // Check file size (5MB limit for images)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Image size too large. Maximum size is 5MB.' },
          { status: 400 }
        );
      }
    }

    if (type === 'resume') {
      const validResumeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!validResumeTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid resume format. Please upload PDF, DOC, or DOCX.' },
          { status: 400 }
        );
      }

      // Check file size (10MB limit for resumes)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Resume size too large. Maximum size is 10MB.' },
          { status: 400 }
        );
      }
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
    const filename = `${timestamp}-${originalName}`;
    
    // Determine upload directory
    const uploadDir = path.join(process.cwd(), 'public/uploads', type);
    await mkdir(uploadDir, { recursive: true });
    
    // Save file
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    // Return accessible URL
    const url = `/uploads/${type}/${filename}`;
    
    return NextResponse.json({ url, success: true });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to check if endpoint is working
export async function GET() {
  return NextResponse.json({ message: 'Upload endpoint is ready' });
}