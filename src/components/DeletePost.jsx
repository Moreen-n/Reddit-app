"use client";
import { useRouter } from "next/navigation.js";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeletePost({ post }) {
  const router = useRouter();
  async function handleDeleteButton() {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });
    // const info = await response.json();

    //setPostText("");
    router.refresh();
  }
  return (
    <div>
      <button className="btns" onClick={handleDeleteButton}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
}
