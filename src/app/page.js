import React from "react";

import Posts from "./posts/page";
import Subreddits from "./subreddits/page";

export default function Home({ post, subreddit, user }) {
  return (
    <div className="main-container">
      <div className="body-container">
        <div className="subreddit-div">
          <Subreddits user={user} subreddit={subreddit} />
        </div>
        <div className="posts-div">
          <Posts subreddit={subreddit} user={user} post={post} />
        </div>
      </div>
    </div>
  );
}
