import React from "react";

const Comment = ({ comment, user, post }) => {
  return (
    <div key={comment?.id} className="comment">
      <p>{comment?.message}</p>

      {comment?.children && comment?.children.length > 0 && (
        <div className="replies">
          {comment?.children.map((reply) => (
            <Comment key={reply.id} comment={reply} user={user} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
