"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function GetCommentNum({ postId }) {
  const [commentNum, setCommentNum] = useState(0);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

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
        fontSize: "1rem",
        position: "relative",
        margin: "0",
        marginBottom: "0",
      }}
    >
      {commentNum === 0
        ? t("No Comments")
        : commentNum === 1
          ? "1 " + t("Comment")
          : `${commentNum} ${t("Comments")}`}
    </p>
  );
}
