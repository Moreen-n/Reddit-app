import React from "react";

import NewPost from "@/components/NewPost";
import { prisma } from "@/lib/prisma.js";

export default async function createPost() {
  const subreddits = await prisma.subreddit.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <NewPost subreddits={subreddits} />
    </div>
  );
}
