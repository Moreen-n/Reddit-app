import Post from "@/components/post";
import { fetchUser } from "@/lib/fetchUser";
import { prisma } from "@/lib/prisma";

const Posts = async () => {
  const user = await fetchUser();
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { user: true, subreddit: true, votes: true },
    });

    return (
      <div id="posts-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} user={user} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};

export default Posts;
