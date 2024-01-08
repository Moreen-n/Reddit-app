"use client";
import { useState } from "react";

import { useRouter } from "next/navigation.js";

import { fetchUser } from "@/lib/fetchUser";
import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VoteButton = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVote = async (voteType) => {
    try {
      setLoading(true);

      const user = fetchUser();
      if (!user) {
        alert("You can't vote. Please log in to vote.");
        return;
      }

      const response = await fetch("/api/vote", {
        method: "POST",
        body: JSON.stringify({
          postId: post.id,
          voteType,
        }),
      });

      const data = await response.json();
      router.refresh();

      if (response.ok) {
        const updatedVotesCount = data.vote.votesCount || 0;
      } else {
        console.error("Error voting:", data.error);
      }
    } catch (error) {
      console.error("Error voting:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const upVotes = post.votes?.filter((vote) => vote.isUpvote)?.length;
  const downVotes = post.votes?.filter((vote) => !vote.isUpvote)?.length;

  return (
    <div className="vote-btns">
      <button
        onClick={() => handleVote(true)}
        disabled={loading}
        className={`upvote ${
          post.userVote && post.userVote.isUpvote ? "active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faUpLong} />
      </button>
      <span className="vote-count">{upVotes - downVotes || 0}</span>
      <button
        onClick={() => handleVote(false)}
        disabled={loading}
        className={`downvote ${
          post.userVote && !post.userVote.isUpvote ? "active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faDownLong} />
      </button>
    </div>
  );
};

export default VoteButton;
