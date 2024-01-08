import { countComments } from "@/lib/CountComments";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

import Comment from "../../../components/Comments";
import CreateComment from "../../../components/NewComent";
import Post from "../../../components/post";
import Reply from "../../../components/reply";

export default async function RedditPost({ params }) {
  try {
    const { postId } = params;

    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: {
        user: true,
        subreddit: true,
        children: { include: { user: true } },
        votes: true,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const user = await fetchUser();

    const subreddit = await prisma.subreddit.findFirst({
      where: {
        id: post.subreddit.id,
      },
    });

    const commentsCount = await countComments(post);

    const comments = await prisma.post.findMany({
      where: {
        parentId: postId,
      },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    const renderReply = (comment) => (
      <Reply
        key={comment.id}
        comment={comments}
        postId={postId}
        user={user}
        post={post}
      >
        {comment.children && comment.children.map(renderReply)}
      </Reply>
    );

    return (
      <div className="posts-id">
        <div>
          <Post
            post={post}
            subreddit={subreddit}
            comments={commentsCount}
            user={user}
          />
          <CreateComment
            user={user}
            subredditId={post.subredditId}
            parentId={postId}
            post={post}
          />
        </div>
        <div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comments}
              user={user}
              post={post}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error.message);

    return <div>Error loading post</div>;
  }
}
