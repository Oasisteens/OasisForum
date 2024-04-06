"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GetCommentNum({ postId }) {
  const [commentNum, setCommentNum] = useState(0);

  useEffect(() => {
    const getCommentNum = async () => {
      const res = await axios.get("/api/getCommentNum", {
        params: {
          id: postId,
        },
      });
      setCommentNum(res.data.commentNum);
    };

    getCommentNum();
  }, [postId]); // Dependency array includes postId, so this effect runs whenever postId changes

  return (
    <p
      style={{
        fontFamily: "sans-serif poppins",
        fontSize: "1.25rem",
        position: "relative",
        bottom: "2px",
      }}
    >
      {commentNum}
    </p>
  );
}
