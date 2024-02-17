'use client'
import React from "react";
import { useState } from "react";
import LikeButton from "./likeButton";

const subComment = ({
    subComment,

}) => {
  return (
    <div key={subComment._id} style={{ padding: "8px" }}>
      <h2 style={{ fontWeight: "700" }}>{subComment.username}</h2>
      <div
        style={{
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
      >
        {subComment.content}
      </div>
      <div style={{ display: "flex" }}>
        <h2 style={{}}>{subComment.postingtime}</h2>
        <button
          onClick={() => handleSubComment(subComment._id)}
          style={{
            display: "flex",
            left: "15vw",
            position: "relative",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={30}
            height={30}
          >
            <path
              fill="#374151"
              strokeWidth={0.5}
              d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
            ></path>
          </svg>
          <p
            style={{
              position: "relative",
              marginTop: "0.5vh",
            }}
          >
            Reply
          </p>
        </button>
        <div
          style={{
            position: "relative",
            left: "16vw",
            top: "0.3vh",
            display: "flex",
          }}
        >
          {likes.map((like, likeIndex) => (
            <LikeButton
              key={like._id + likeIndex}
              category="comment"
              postId={subComment._id}
              likeloads={likeloads}
              like={like}
              likestatuses={likestatuses}
              username={username}
              setLikestatuses={setLikestatuses}
              setLikes={setLikes}
              size={30}
              fontsize="1.2rem"
              shift="1px"
              height="37px"
            />
          ))}
        </div>
      </div>
      {addCommentDisplay.includes(subComment._id) && (
        <SubCommentUpload
          fetchLikes={fetchLikes}
          postId={post._id}
          username={username}
          commentId={subComment._id}
          commentOpen={addCommentDisplay.includes(subComment._id)}
          getComments={getComments}
        />
      )}
    </div>
  );
};

export default subComment;
