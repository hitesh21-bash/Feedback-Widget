import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, rating, message, pageUrl, category } = body;
    
    // Validation
    if (!name || !email || !rating || !message || !category) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    
    const feedback = {
      name,
      email,
      rating: Number(rating),
      category: category || 'general',
      message,
      pageUrl: pageUrl || 'unknown',
      status: 'pending',
      isPublic: false,
      createdAt: new Date(),
    };
    
    const result = await db.collection('feedbacks').insertOne(feedback);
    
    return NextResponse.json({
      success: true,
      id: result.insertedId,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}