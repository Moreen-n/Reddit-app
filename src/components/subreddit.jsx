"use client";
import { useState } from "react";

const CreateSubreddit = ({ onCreate }) => {
  const [subredditName, setSubredditName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/subreddits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subredditName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create subreddit");
      }

      const subreddit = await response.json();
      console.log(subreddit);
      onCreate(subreddit);

      setSubredditName("");
    } catch (error) {
      console.error("Error creating subreddit:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter a community name "
        type="text"
        value={subredditName}
        onChange={(e) => setSubredditName(e.target.value)}
        required
      />

      <button type="submit">Create Subreddit</button>
    </form>
  );
};

export default CreateSubreddit;
