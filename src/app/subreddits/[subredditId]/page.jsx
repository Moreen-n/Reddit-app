import Post from "@/components/post";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function Subreddit({ params }) {
  const { subredditId } = params;
  const user = await fetchUser();

  const subreddit = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  const posts = await prisma.post.findMany({
    where: { subredditId },
    include: { user: true, subreddit: true },
  });

  return (
    <>
      <h3>{subreddit.name}</h3>
      <div className="post-containers">
        {posts.map((post) => (
          <div className="post-containers" key={post.id}>
            <Post post={post} key={post.id} user={user} />
          </div>
        ))}
      </div>
    </>
  );
}
