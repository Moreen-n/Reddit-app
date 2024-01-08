import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    success: true,
    message: "Welcome to the Reddit Server!",
  });
}
