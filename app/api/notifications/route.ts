import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Notification from '@/lib/models/Notification';
import { getCurrentUser } from '@/lib/auth';

// GET - List notifications
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    
    const query: any = { user: currentUser.userId };
    if (unreadOnly) {
      query.read = false;
    }
    
    const notifications = await Notification.find(query)
      .populate('relatedCase', 'caseNumber title')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    
    const unreadCount = await Notification.countDocuments({
      user: currentUser.userId,
      read: false,
    });
    
    return NextResponse.json({
      notifications,
      unreadCount,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}