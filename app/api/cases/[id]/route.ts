import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Case from '@/lib/models/Case';
import Notification from '@/lib/models/Notification';
import { getCurrentUser } from '@/lib/auth';
import { caseSchema } from '@/lib/validations/case';

// GET - Single case
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const caseData = await Case.findById(params.id)
      .populate('assignedLawyer', 'name email avatar specialization')
      .populate('notes.createdBy', 'name avatar')
      .lean();
    
    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    
    // Check access
    if (currentUser.role !== 'admin' && caseData.assignedLawyer._id.toString() !== currentUser.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    return NextResponse.json({ case: caseData }, { status: 200 });
    
  } catch (error) {
    console.error('Get case error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update case
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    await connectDB();
    
    const existingCase = await Case.findById(params.id);
    
    if (!existingCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    
    // Check access
    if (currentUser.role !== 'admin' && existingCase.assignedLawyer.toString() !== currentUser.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Check if status changed
    const statusChanged = body.status && body.status !== existingCase.status;
    
    // Update case
    const updatedCase = await Case.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('assignedLawyer', 'name email');
    
    // Add timeline entry if status changed
    if (statusChanged) {
      updatedCase.timeline.push({
        event: `Status changed to ${body.status}`,
        date: new Date(),
        description: `Case status updated from ${existingCase.status} to ${body.status}`,
      });
      await updatedCase.save();
      
      // Create notification
      await Notification.create({
        user: currentUser.userId,
        type: 'case_update',
        title: 'Case Status Updated',
        message: `Case ${updatedCase.caseNumber} status changed to ${body.status}`,
        relatedCase: updatedCase._id,
      });
    }
    
    return NextResponse.json(
      { message: 'Case updated successfully', case: updatedCase },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error('Update case error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete case
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const caseData = await Case.findById(params.id);
    
    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    
    // Only admin or assigned lawyer can delete
    if (currentUser.role !== 'admin' && caseData.assignedLawyer.toString() !== currentUser.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    await Case.findByIdAndDelete(params.id);
    
    // Delete related notifications
    await Notification.deleteMany({ relatedCase: params.id });
    
    return NextResponse.json(
      { message: 'Case deleted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Delete case error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


