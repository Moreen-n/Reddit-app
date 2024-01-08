import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request, response) {
  try {
    const { postId } = response.params;

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    const { message } = await request.json();

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    const updatedText = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { message },
    });
    return NextResponse.json({ success: true, post: updatedText });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function DELETE(request, response) {
  try {
    const { postId } = response.params;
    const post = await prisma.post.delete({ where: { id: postId } });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "No post with that ID found",
    });
  }
}
