// app/api/test-db/route.ts
// import connectDB from '@/lib/db';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    // Check which database you're actually connected to
    const dbName = mongoose.connection.db?.databaseName;
    const collections = await mongoose.connection.db?.listCollections().toArray();
    
    return Response.json({ 
      status: 'connected',
      database: dbName,          // ← tells you exact DB name
      collections: collections?.map(c => c.name)  // ← lists all collections
    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}