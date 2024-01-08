import { NextResponse } from "next/server";

import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request, response) {
  try {
    const { title, message, subredditId, parentId } = await request.json();
    const user = await fetchUser();

    if (!message) {
      return NextResponse.json({
        success: false,
        error: "You must provide a title to create a post.",
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        message,
        subredditId,
        userId: user.id,
        parentId,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
