"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { faComment, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import the Comments component
import Comments from "./Comments";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import VoteButton from "./Vote";

export default function Post({ post, user, username }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/posts/${post.id}`);
  };

  const handleCommentClick = () => {
    setIsCommenting(true);
  };

  return (
    <div className="post-containers" onClick={handlePostClick}>
      <div className="vote-btns">
        <VoteButton post={post} />
      </div>
      <div className="posts-div">
        {post ? (
          isEditing ? (
            <EditPost
              post={post}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : (
            <>
              <div className="name-sub">
                <h6 className="post-title">r/{post.subreddit?.name}</h6>
                <small>
                  <i>posted by u/{post.user?.username}</i>
                </small>
              </div>

              <h4 className="post-title">{post.title}</h4>
              <p className="post-content">{post.message}</p>

              {isCommenting && (
                <div>
                  <Comments postId={post.id} user={user} />
                </div>
              )}

              <div className="post-buttons-containers">
                <button className="btns" onClick={handleCommentClick}>
                  <FontAwesomeIcon icon={faComment} /> {post.commentsCount}{" "}
                  comments
                </button>
                {user?.id === post.user?.id ? <DeletePost post={post} /> : null}
                {user?.id === post.user?.id ? (
                  <button className="btns" onClick={() => setIsEditing(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                ) : null}
              </div>
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
