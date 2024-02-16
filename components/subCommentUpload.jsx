"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

const subCommentUpload = ({
  postIndex,
  getComments,
  commentOpen,
  commentId,
  username,
  fetchLikes,
  postId,
}) => {
  const [comment, setComment] = useState("");
  const [commentFiles, setCommentFiles] = useState([]);
  const [commentWords, setCommentWords] = useState(0);
  const [commentDisplay, setCommentDisplay] = useState(false);
  const [commentUploadLoad, setCommentUploadLoad] = useState(false);
  const [temp, setTemp] = useState(false);
  const [anonymous, setAnonymous] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentWords(0);

    if (username === undefined && username === null) {
      alert("You must login to post");
      return;
    }

    if (
      comment === null ||
      comment === undefined ||
      comment === "Comment on this..."
    ) {
      alert("Comment cannot be empty");
      return;
    } else if (comment.split(" ").filter((word) => word).length > 500) {
      alert("Comment cannot be more than 500 words");
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
        await getComments(postIndex, postId);
        setCommentUploadLoad(false);
        setCommentDisplay(false);
        setTemp(false);
        setComment("");
        document.getElementById("subComment").style.color = "gray";
        setCommentFiles([]);
        setAnonymous(false);
      }
      fetchLikes();
    } catch (error) {
      console.log(error);
      setCommentUploadLoad(false);
    }
  };

  useEffect(() => {
    if (commentOpen) {
      setCommentDisplay(false);
      setTemp(false);
      setComment("");
      setCommentFiles([]);
      setAnonymous(false);
    }
  }, [commentOpen]);
  return (
    <div className="commentForm">
      <form
        onSubmit={(e) => {
          handleCommentSubmit(e);
        }}
        encType="multipart/form-data"
      >
        <input type="hidden" name="id" id="id" value={commentId} />
        <div
          contentEditable
          required
          id="subComment"
          name="subComment"
          style={{
            borderBottomLeftRadius: !(commentDisplay || temp) ? "5px" : "0",
            borderBottomRightRadius: !(commentDisplay || temp) ? "5px" : "0",
            borderBottom: commentDisplay || temp ? "none" : "",
          }}
          onInput={(e) => {
            const value = e.target.textContent;
            setCommentWords(value.split(" ").filter((word) => word).length);
          }}
          onFocus={(e) => {
            if (e.target.textContent === "Comment on this...") {
              e.target.textContent = "";
              e.target.style.color = "black";
            }
            setCommentDisplay(true);
          }}
          onBlur={(e) => {
            if (e.target.textContent === "") {
              e.target.textContent = "Comment on this...";
              e.target.style.color = "gray";
            }
            setCommentDisplay(false);
          }}
        >
          {comment === "" ? "Comment on this..." : comment}
        </div>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              fontSize: "0.85rem",
              right: "0.7vw",
              bottom: "0vh",
            }}
          >
            {commentWords}
          </span>
        </div>
        {/* This hr is not needed for now. */}
        {/* <hr width="97%" style={{margin: "0 auto", marginBottom: "1vh"}}/> */}
        {(commentDisplay || temp) && (
          <div
            tabIndex={0}
            onMouseDown={() => setTemp(true)}
            onBlur={() => setTemp(false)}
          >
            <label
              className="picUpload"
              htmlFor="input-files"
              style={{
                borderRadius: "0",
                marginBottom: "0",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Pictures
              <input
                type="file"
                id="input-files"
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
              {anonymous ? "Anonymous" : "Not Anonymous"}
            </div>
            <button
              type="submit"
              className="postCommentBtn"
              disabled={commentUploadLoad}
              onClick={() => {
                setComment(document.getElementById("subComment").textContent);
              }}
            >
              {commentUploadLoad ? (
                <div className="load">
                  <TailSpin
                    type="ThreeDots"
                    color="white"
                    height={20}
                    width={40}
                    style={{ marginRight: "5px" }}
                  />
                  <span className="ld">Loading...</span>
                </div>
              ) : (
                <p className="ldd">Post</p>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default subCommentUpload;
