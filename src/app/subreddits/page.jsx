"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation.js";

import CreateSubreddit from "@/components/subreddit";

// The Subreddits component
export default function Subreddits({ user }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [subreddits, setSubreddits] = useState([]);
  const [createError, setCreateError] = useState(null);
  const router = useRouter(); // Get the router object

  // Function to fetch subreddits
  const fetchSubreddits = async () => {
    try {
      const response = await fetch("/api/subreddits");
      const info = await response.json();
      console.log(info);
      setSubreddits(info.subreddits);
    } catch (error) {
      console.error("Error fetching subreddits:", error.message);
    }
  };

  useEffect(() => {
    fetchSubreddits();
  }, []);

  const handleCreateSubreddit = (subreddit) => {
    if (user) {
      setSubreddits((prevSubreddits) => [...prevSubreddits, subreddit]);
      setShowCreateForm(false);
      setCreateError(null);
      router.reload(); // Reload the current route
    } else {
      setCreateError("Please log in to create a subreddit.");
    }
  };

  return (
    <div>
      {createError && <p style={{ color: "red" }}>{createError}</p>}

      <button
        className="create-sub-btn"
        onClick={() => setShowCreateForm(true)}
      >
        + Create Community
      </button>

      {showCreateForm && <CreateSubreddit onCreate={handleCreateSubreddit} />}

      {subreddits?.map((subreddit) => (
        <div key={subreddit.id}>
          <Link href={`/subreddits/${subreddit.id}`}>{subreddit.name}</Link>
        </div>
      ))}
    </div>
  );
}
