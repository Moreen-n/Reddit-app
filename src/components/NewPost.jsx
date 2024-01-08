"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation.js";

export default function NewPost({ subreddits }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [selectedSubreddit, setSelectedSubreddit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    if (!selectedSubreddit) {
      return setError("Please select a subreddit");
    }

    const response = await fetch("/api/posts", {
      method: "POST",

      body: JSON.stringify({
        title: title,
        message: postText,
        subredditId: selectedSubreddit,
      }),
    });

    const createdPost = await response.json();
    if (createdPost.error) {
      return setError(createdPost.error);
    }
    console.log(createdPost);
    // onSubmit(createdPost);

    router.push(`/`);

    setTitle("");
    setPostText("");
    setSelectedSubreddit("");

    setIsLoading(false);
  }

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <select
          value={selectedSubreddit}
          onChange={(e) => setSelectedSubreddit(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a subreddit
          </option>
          {subreddits.map((subreddit) => (
            <option key={subreddit.id} value={subreddit.id}>
              {subreddit.name}
            </option>
          ))}
        </select>

        <input
          className="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title"
          required
        />

        <textarea
          value={postText}
          placeholder="What are your thoughts?"
          onChange={(e) => setPostText(e.target.value)}
          required
          title="Please enter a post"
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Posting..." : "Post"}
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
}
