import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Client from '@/lib/models/Clients';
import { getCurrentUser } from '@/lib/auth';
import { clientSchema } from '@/lib/validations/client';

// GET - List all clients
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    
    const query: any = {};
    
    // Role-based filtering
    if (currentUser.role !== 'admin') {
      query.assignedLawyer = currentUser.userId;
    }
    
    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }
    
    const clients = await Client.find(query)
      .populate('assignedLawyer', 'name email')
      .sort({ createdAt: -1 })
      .lean();
    
    // Get case count for each client
    const clientsWithCaseCount = await Promise.all(
      clients.map(async (client) => {
        const caseCount = client.cases?.length || 0;
        return {
          ...client,
          totalCases: caseCount,
        };
      })
    );
    
    return NextResponse.json({ clients: clientsWithCaseCount }, { status: 200 });
    
  } catch (error) {
    console.error('Get clients error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new client
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Validate input
    const validatedData = clientSchema.parse(body);
    
    await connectDB();
    
    // Create client
    const newClient = await Client.create({
      ...validatedData,
      assignedLawyer: currentUser.userId,
      cases: [],
    });
    
    await newClient.populate('assignedLawyer', 'name email');
    
    return NextResponse.json(
      { message: 'Client created successfully', client: newClient },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('Create client error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}