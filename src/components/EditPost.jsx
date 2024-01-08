"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation.js";

export default function EditPost({ post, isEditing, setIsEditing }) {
  const [updatedMessage, setUpdatedMessage] = useState(post.message);
  const router = useRouter();

  useEffect(() => {
    if (isEditing) {
      setUpdatedMessage(post.message);
    }
  }, [isEditing, post.message]);

  // to handle saving the edited post
  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: updatedMessage,
        }),
      });
      router.refresh();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="edit-container">
      <input
        id="edit-input"
        type="text"
        value={updatedMessage}
        onChange={(e) => setUpdatedMessage(e.target.value)}
      />
      <div className="edit-btns">
        <button className="edit-btns" onClick={handleSaveClick}>
          Edit post
        </button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    </div>
  );
}
