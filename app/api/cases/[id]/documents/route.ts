import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Case from '@/lib/models/Case';
import Notification from '@/lib/models/Notification';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { title, url, publicId, category } = body;
    
    if (!title || !url || !publicId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const caseData = await Case.findById(params.id);
    
    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    
    // Add document
    caseData.documents.push({
      title,
      url,
      publicId,
      category: category || 'Other',
      uploadedAt: new Date(),
    });
    
    await caseData.save();
    
    // Create notification
    await Notification.create({
      user: caseData.assignedLawyer,
      type: 'document_upload',
      title: 'New Document Uploaded',
      message: `Document "${title}" uploaded to case ${caseData.caseNumber}`,
      relatedCase: caseData._id,
    });
    
    return NextResponse.json(
      { message: 'Document uploaded successfully', documents: caseData.documents },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Upload document error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}