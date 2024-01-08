import { NextResponse } from "next/server";

import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export async function POST(request, response) {
  try {
    const user = await fetchUser();

    const { voteType, postId } = await request.json();

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "Post not found",
      });
    }

    const existingVote = await prisma.vote.findFirst({
      where: {
        postId,
        userId: user.id,
      },
    });

    if (existingVote) {
      const updatedVote = await prisma.vote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          isUpvote: voteType,
        },
      });

      if (existingVote.isUpvote === voteType) {
        await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
      }
      // const updatedPost = await prisma.post.update({
      //   where: {
      //     id: postId,
      //   },
      //   votes: {
      //     push: updatedVote,
      //   },
      // });
      return NextResponse.json({
        success: true,
        vote: updatedVote,
        // post: updatedPost,
      });
    }

    const newVote = await prisma.vote.create({
      data: {
        postId,
        userId: user.id,
        isUpvote: voteType,
      },
    });

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        votes: newVote,
      },
    });

    return NextResponse.json({
      success: true,
      vote: newVote,
      post: updatedPost,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function GET(request, response) {
  try {
    const { postId } = request.params;

    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: {
        votes: true,
      },
    });

    // Handle the case where the post is not found
    if (!post) {
      return NextResponse.json({
        success: false,
        error: "Post not found",
      });
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
