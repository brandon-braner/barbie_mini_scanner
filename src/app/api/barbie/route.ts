import { NextResponse } from 'next/server';
import { queryBarbieByCode } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Product code is required' }, { status: 400 });
  }

  try {
    const barbie = queryBarbieByCode(code);
    
    if (!barbie) {
      return NextResponse.json({ error: 'Barbie not found' }, { status: 404 });
    }

    return NextResponse.json(barbie);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
