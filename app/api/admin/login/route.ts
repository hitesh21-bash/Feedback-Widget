import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Handle logout
  if (body.logout) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_token');
    return response;
  }
  
  // Handle login
  const { password } = body;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  
  const token = signToken({ role: 'admin' });
  
  const response = NextResponse.json({ success: true });
  
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  
  return response;
}