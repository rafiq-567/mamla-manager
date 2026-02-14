import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Case from '@/lib/models/Case';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    // Build base query
    const baseQuery: any = {};
    if (currentUser.role !== 'admin') {
      baseQuery.assignedLawyer = currentUser.userId;
    }
    
    // Total cases
    const totalCases = await Case.countDocuments(baseQuery);
    
    // Active cases
    const activeCases = await Case.countDocuments({
      ...baseQuery,
      status: { $in: ['Filed', 'In Progress', 'Pending'] },
    });
    
    // Cases by status
    const casesByStatus = await Case.aggregate([
      { $match: baseQuery },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    
    // Cases by type
    const casesByType = await Case.aggregate([
      { $match: baseQuery },
      { $group: { _id: '$caseType', count: { $sum: 1 } } },
    ]);
    
    // Cases by priority
    const casesByPriority = await Case.aggregate([
      { $match: baseQuery },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);
    
    // Upcoming hearings (next 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingHearings = await Case.find({
      ...baseQuery,
      nextHearingDate: { $gte: today, $lte: nextWeek },
    })
      .select('caseNumber title nextHearingDate')
      .sort({ nextHearingDate: 1 })
      .limit(5);
    
    // Monthly case trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyTrends = await Case.aggregate([
      { $match: { ...baseQuery, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);
    
    // Win/Loss ratio
    const outcomes = await Case.aggregate([
      { $match: { ...baseQuery, status: { $in: ['Won', 'Lost', 'Settled'] } } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    
    return NextResponse.json({
      totalCases,
      activeCases,
      casesByStatus,
      casesByType,
      casesByPriority,
      upcomingHearings,
      monthlyTrends,
      outcomes,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}