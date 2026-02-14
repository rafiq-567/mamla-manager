import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Case from '@/lib/models/Case';
import Notification from '@/lib/models/Notification';
import { getCurrentUser } from '@/lib/auth';
import { caseSchema } from '@/lib/validations/case';

// GET - List all cases with filters
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const caseType = searchParams.get('caseType') || '';
    const priority = searchParams.get('priority') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Build query
    const query: any = {};
    
    // Role-based filtering
    if (currentUser.role !== 'admin') {
      query.assignedLawyer = currentUser.userId;
    }
    
    // Search
    if (search) {
      query.$or = [
        { caseNumber: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { 'client.name': { $regex: search, $options: 'i' } },
      ];
    }
    
    // Filters
    if (status) query.status = status;
    if (caseType) query.caseType = caseType;
    if (priority) query.priority = priority;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const cases = await Case.find(query)
      .populate('assignedLawyer', 'name email avatar')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Case.countDocuments(query);
    
    return NextResponse.json({
      cases,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }, { status: 200 });
    
  } catch (error) {
    console.error('Get cases error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new case
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Validate input
    const validatedData = caseSchema.parse(body);
    
    await connectDB();
    
    // Check if case number already exists
    const existingCase = await Case.findOne({ caseNumber: validatedData.caseNumber });
    if (existingCase) {
      return NextResponse.json(
        { error: 'Case number already exists' },
        { status: 400 }
      );
    }
    
    // Create case
    const newCase = await Case.create({
      ...validatedData,
      assignedLawyer: currentUser.userId,
      timeline: [{
        event: 'Case Filed',
        date: new Date(validatedData.filingDate),
        description: 'Case has been filed',
      }],
    });
    
    // Populate assigned lawyer
    await newCase.populate('assignedLawyer', 'name email');
    
    // Create notification
    await Notification.create({
      user: currentUser.userId,
      type: 'case_assigned',
      title: 'New Case Created',
      message: `Case ${newCase.caseNumber} has been created`,
      relatedCase: newCase._id,
    });
    
    return NextResponse.json(
      { message: 'Case created successfully', case: newCase },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('Create case error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}