import { NextResponse } from "next/server";

import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export async function GET() {
  try {
    const subreddits = await prisma.subreddit.findMany();
    return NextResponse.json({ success: true, subreddits });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request) {
  try {
    const { name, username } = await request.json();

    const user = await fetchUser();

    // Validat input
    if (!name || !user.id) {
      return NextResponse.json({
        success: false,
        error: "Name and userId are required.",
      });
    }

    const subreddit = await prisma.subreddit.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, subreddit });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
