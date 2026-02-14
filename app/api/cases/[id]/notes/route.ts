import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Case from '@/lib/models/Case';
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
    
    const { content } = await request.json();
    
    if (!content || content.trim() === '') {
      return NextResponse.json({ error: 'Note content is required' }, { status: 400 });
    }
    
    await connectDB();
    
    const caseData = await Case.findById(params.id);
    
    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    
    // Add note
    caseData.notes.push({
      content,
      createdBy: currentUser.userId,
      createdAt: new Date(),
    });
    
    await caseData.save();
    await caseData.populate('notes.createdBy', 'name avatar');
    
    return NextResponse.json(
      { message: 'Note added successfully', notes: caseData.notes },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Add note error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}