"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useRef } from "react";
import axios from "axios";
import count from "word-count";
import styles from "../../app/src/commentsection.module.css";

const commentUpload = ({
  getComments,
  commentOpen,
  postId,
  username,
  fetchLikes,
  type,
  setCommentUploadRefresh,
  commentUploadRefresh,
}) => {
  const [comment, setComment] = useState("");
  const [commentFiles, setCommentFiles] = useState([]);
  const [commentWords, setCommentWords] = useState(0);
  const [commentDisplay, setCommentDisplay] = useState(false);
  const [commentUploadLoad, setCommentUploadLoad] = useState(false);
  const [temp, setTemp] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const commentRef = useRef(null);
  const { t } = useTranslation();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert(t("You must login to post"));
      return;
    }

    if (comment === null || comment === undefined) {
      alert(t("Comment cannot be empty"));
      return;
    } else if (commentWords > 500) {
      alert(t("Comment cannot be more than 500 words"));
      return;
    }

    const formData = new FormData();
    formData.append("content", comment);
    formData.append("anonymous", anonymous);
    formData.append("group", "general");
    formData.append("postId", e.target.id.value);
    formData.append("username", username);

    if (commentFiles) {
      for (let i = 0; i < commentFiles.length; i++) {
        formData.append("files", commentFiles[i]);
      }
    }
    try {
      setCommentUploadLoad(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SOURCE_URL}/uploadComment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status === 201) {
        await getComments(e.target.id.value);
        setCommentUploadLoad(false);
        setCommentUploadRefresh([...commentUploadRefresh, postId]);
        setCommentDisplay(false);
        setTemp(false);
        setComment("");
        setCommentWords(0);
        document.getElementById("comment").style.color = "gray";
        setCommentFiles([]);
        setAnonymous(false);
        if (commentRef.current) {
          commentRef.current.style.height = "40px";
        }
      }
      if (type != "individual") {
        fetchLikes();
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        alert(t("Too many requests. Please try again later."));
      }
      setCommentUploadLoad(false);
    }
  };

  useEffect(() => {
    const ind =
      type === "individual" ? commentOpen : commentOpen.includes(postId);
    if (ind) {
      setCommentDisplay(false);
      setTemp(false);
      setComment("");
      setCommentFiles([]);
      setAnonymous(false);
    }
  }, [commentOpen]);
  return (
    <div className={styles.commentForm}>
      <form
        onSubmit={(e) => {
          handleCommentSubmit(e);
        }}
        encType="multipart/form-data"
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          console.log(e.dataTransfer.files);
          setCommentFiles(e.dataTransfer.files);
        }}
      >
        <input type="hidden" name="id" id="id" value={postId} />
        <textarea
          ref={commentRef}
          required
          className={styles.comment}
          name="comment"
          rows={1}
          placeholder={t("Comment on this post...")}
          style={{
            borderBottomLeftRadius: !(commentDisplay || temp) ? "5px" : "0",
            borderBottomRightRadius: !(commentDisplay || temp) ? "5px" : "0",
            borderBottom: commentDisplay || temp ? "none" : "",
          }}
          onInput={(e) => {
            const value = e.target.value;
            const words = count(value);
            setCommentWords(words);
            setComment(value); // Update title state
            e.target.style.height = "40px";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          onFocus={(e) => {
            e.target.style.color = "black";
            e.target.style.height = "40px";
            e.target.style.height = e.target.scrollHeight + "px";
            setCommentDisplay(true);
          }}
          onBlur={(e) => {
            e.target.style.color = "gray";
            setCommentDisplay(false);
          }}
          value={comment}
        />
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              fontSize: "0.85rem",
              right: "5px",
              bottom: "5px",
            }}
          >
            {commentWords}
          </span>
        </div>
        {/* This hr is not needed for now. */}
        {/* <hr width="97%" style={{margin: "0 auto", marginBottom: "1vh"}}/> */}
        {(commentDisplay || temp) && (
          <div
            style={{ position: "relative", top: "-1vh" }}
            tabIndex={0}
            onMouseDown={() => setTemp(true)}
            onBlur={() => setTemp(false)}
          >
            <label
              className={styles.picUpload}
              htmlFor="input-files"
              style={{
                borderRadius: "0",
                marginBottom: "0",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {commentFiles.length > 1 &&
                `${commentFiles.length}${t(" files has been uploaded")}`}
              {commentFiles.length === 1 &&
                `${commentFiles.length}${t(" file has been uploaded")}`}
              {!(commentFiles.length > 1) &&
                !(commentFiles.length === 1) &&
                t("Pictures or Videos (Drag and drop or Click)")}
              <input
                type="file"
                id="input-files"
                style={{ display: "none" }}
                className="form-control-file border"
                onChange={(e) => setCommentFiles(e.target.files)}
                multiple
              />
            </label>
            <div
              onClick={() => setAnonymous(!anonymous)}
              style={{
                backgroundColor: anonymous ? "#3AA138" : "#EF5C5C",
                color: "white",
                fontWeight: "600",
                textAlign: "center",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {anonymous ? t("Anonymous") : t("Not Anonymous")}
            </div>
            <button
              type="submit"
              className={styles.postCommentBtn}
              disabled={commentUploadLoad}
            >
              {commentUploadLoad ? (
                <div className={styles.load}>
                  <TailSpin
                    type="ThreeDots"
                    color="white"
                    height={20}
                    width={40}
                    style={{ marginRight: "5px" }}
                  />
                  <span className={styles.ld}>Loading...</span>
                </div>
              ) : (
                <p className={styles.ldd}>{t("Post")}</p>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default commentUpload;
