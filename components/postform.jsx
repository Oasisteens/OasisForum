"use client";
import "../app/src/post.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../app/i18n.js";
import Skeleton from "./skeletons/Skeleton.jsx";
import LikeButton from "./likeButton.jsx";
import { TailSpin } from "react-loader-spinner";
import { Picker } from "emoji-mart";
import { useTranslation } from "react-i18next";
import SubCommentUpload from "./subCommentUpload";
import ColorThief from "colorthief";
import CommentUpload from "./commentUpload";
import SubComment from "./subComment";
import Link from "next/link";

function Postform({ id, username }) {
  const [post, setPost] = useState(null);
  const [like, setLike] = useState(null);
  const [likes, setLikes] = useState([]); // For comment likes
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [check, setCheck] = useState([]);
  const [imgCheck, setImgCheck] = useState();
  const [ok, setOk] = useState(false);
  const [posts, setPosts] = useState([]);
  const [backCheck, setBackCheck] = useState(false);
  const [subComments, setSubComments] = useState([]);
  const [likestatuses, setLikestatuses] = useState([]);
  const [likeloads, setLikeloads] = useState(true);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);
  // const [commentNumber, setCommentNumber] = useState([]);
  // The commentDisplay function is for showing the comment post button and the picturen upload button. If the content is focused, or in other words, the user is writing or editing the comment, it shows, else, we need to make space for showing other comments.
  const [addCommentDisplay, setAddCommentDisplay] = useState([]);
  const [admi, setAdmi] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const router = useRouter();

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/fetchPost?id=${id}`);
      setPost(res.data.post);
      setLike(res.data.like);
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        router.push("/404");
      }
    }
  }; //fetch post

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", navigator.language.substring(0, 2));
    }
    const selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]); //localstorage get language setting

  useEffect(() => {
    if (!localStorage.getItem("dashColor")) {
      localStorage.setItem("dashColor", "blue");
    }
    const selectedColor = localStorage.getItem("dashColor");
    if (selectedColor !== "blue") {
      document.documentElement.style.setProperty(
        "--main-color",
        `var(--${selectedColor})`,
      );
      document.documentElement.style.setProperty(
        "--sub-color",
        `var(--${selectedColor}-light)`,
      );
      document.documentElement.style.setProperty(
        "--sec-color",
        `var(--${selectedColor}-lightest)`,
      );
    } else {
      document.documentElement.style.setProperty(
        "--main-color",
        `var(--blue-lighter)`,
      );
      document.documentElement.style.setProperty(
        "--sub-color",
        `var(--blue-light)`,
      );
      document.documentElement.style.setProperty(
        "--sec-color",
        `var(--blue-lightest)`,
      );
    }
  }, []); //localstorage get color setting

  const getComments = async (id) => {
    try {
      const [res, response] = await Promise.all([
        axios.get("/api/fetchCommentLikes", {
          params: {
            commentIds: comments.map((comment) => comment._id),
            subIds: subComments.map((subComment) => subComment._id),
          },
        }),
        axios.get("/api/fetchComments", {
          params: {
            postId: id,
          },
        }),
      ]);

      if (response.data.comments.length < comments.length) {
        setComments(response.data.comments);
      } else {
        // Create a Set of comment IDs for faster lookup
        const commentIds = new Set(comments.map((comment) => comment._id));

        // Filter out the comments that are already in the comments array
        const uniqueNewComments = response.data.comments.filter(
          (newComment) => !commentIds.has(newComment._id),
        );

        // Add the unique new comments to the comments array
        setComments([...comments, ...uniqueNewComments]);
      }

      if (response.data.subComments.length < subComments.length) {
        setSubComments(response.data.subComments);
      } else {
        // Create a Set of subcomment IDs for faster lookup
        const subCommentIds = new Set(
          subComments.map((subComment) => subComment._id),
        );

        // Filter out the subcomments that are already in the subComments array
        const uniqueNewSubComments = response.data.subComments.filter(
          (newSubComment) => !subCommentIds.has(newSubComment._id),
        );

        // Add the unique new subcomments to the subComments array
        setSubComments([...subComments, ...uniqueNewSubComments]);
      }
      setLikes(res.data.likes);
    } catch (error) {
      console.log(error);
    }
  }; //get comments for post in which its _id is equal to id and get comment likes

  const deleteComment = async (e) => {
    e.preventDefault();
    const commentId = e.target.commentId.value;
    const postId = id;
    try {
      const res = await axios.delete("/api/fetchComments", {
        data: {
          commentId,
        },
      });
      await getComments(postId);
    } catch (error) {
      console.log(error);
    }
  }; //delete a specific comment

  const imagePreview = (index, img) => {
    document.body.style.overflowY = "hidden";
    const colorThief = new ColorThief();
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = `${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${img.filename}`;

    image.onload = async function () {
      const colors = await colorThief.getPalette(image, 3);
      const rgbColors = colors.map((color) => `rgb(${color.join(", ")})`);
      document.documentElement.style.setProperty("--1-color", rgbColors[0]);
      document.documentElement.style.setProperty("--2-color", rgbColors[1]);
      document.documentElement.style.setProperty("--3-color", rgbColors[2]);
    };
    let Array = [...check]; // create a copy of the current state
    Array[index] = true; // set the first element to false
    setCheck(Array); // update the state
    setBackCheck(true);
  }; //preview images (>=2)

  const imagePreview1 = (img) => {
    document.body.style.overflowY = "hidden";
    const colorThief = new ColorThief();
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = `${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${img.filename}`;

    image.onload = async function () {
      const colors = await colorThief.getPalette(image, 3);
      console.log(colors);
      const rgbColors = colors.map((color) => `rgb(${color.join(", ")})`);
      document.documentElement.style.setProperty("--1-color", rgbColors[0]);
      document.documentElement.style.setProperty("--2-color", rgbColors[1]);
      document.documentElement.style.setProperty("--3-color", rgbColors[2]);
    };
    setImgCheck(true);
    setOk(true);
  }; //preview single image

  const handleWheel = (e) => {
    setScale((prevScale) => {
      let newScale = prevScale + e.deltaY * -0.1;
      // Prevent the scale from becoming too small or negative
      newScale = Math.max(0.4, newScale);
      // Prevent the scale from becoming too large
      newScale = Math.min(2, newScale);
      return newScale;
    });
  }; //handle wheel for zooming in and out

  const handleCheckClose = (index) => {
    let newArray = [...check]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setCheck(newArray); // update the state
    setBackCheck(false);
    document.documentElement.style.setProperty("--1-color", "#f2f4f5");
    document.documentElement.style.setProperty("--2-color", "#f2f4f5");
    document.documentElement.style.setProperty("--3-color", "#f2f4f5");
    document.body.style.overflowY = "scroll";
  }; //setting for image preview

  const handleClose = (index) => {
    setOk(false);
    let newArray = [...imgCheck]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setImgCheck(newArray); // update the state
    document.documentElement.style.setProperty("--1-color", "#f2f4f5");
    document.documentElement.style.setProperty("--2-color", "#f2f4f5");
    document.documentElement.style.setProperty("--3-color", "#f2f4f5");
    document.body.style.overflowY = "scroll";
  }; //setting for image preview1

  const handleSub = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("/api/general", {
        data: {
          id: e.target.id.value,
        },
      });
      await fetchPost();
    } catch (error) {
      console.log(error);
    }
  }; //delete post

  const handleRefresh = async () => {
    await fetchPost();
    // setCommentOpen([].map(() => false));
  }; //refresh page

  const handleSubComment = (commentId) => {
    const ind = addCommentDisplay.includes(commentId);
    if (ind) {
      setAddCommentDisplay(addCommentDisplay.filter((id) => id !== commentId));
    } else {
      setAddCommentDisplay([...addCommentDisplay, commentId]);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []); //initial setup

  const loadImage = (src, maxTries = 3) => {
    return new Promise((resolve, reject) => {
      let tries = 0;
      const img = new Image();

      img.onload = resolve;
      img.onerror = () => {
        tries++;
        if (tries < maxTries) {
          img.src = src;
        } else {
          console.error(`Failed to load image after ${maxTries} attempts`);
        }
      };

      img.src = src;
    });
  }; //load image

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(
          posts.map((post) =>
            post.pictureUrl.map((image) =>
              loadImage(
                `${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${image.filename}`,
              ),
            ),
          ),
        );
      } catch (error) {
        console.log("One or more images failed to load", error);
      }
    };

    loadImages();
  }, [posts]); //load images

  return (
    <section>
      <title>{post && post.title}</title>
      <div id="topBar">
        <a href="/general" className="titleg">
          {t("General")}
        </a>{" "}
        {/* to intro page */}
      </div>
      <br />
      <br />
      <a href="/dashboard" id="backButton">
        {t("Back to Dashboard")}
      </a>{" "}
      {/* back to dashboard button */}
      <button className="refreshBtn" onClick={handleRefresh}>
        {t("Refresh")}
      </button>{" "}
      {/* refresh button */}
      {Array.from({ length: 4 }).map((_, i) => (
        <br key={i} />
      ))}
      {loading && (
        <div className="borderClass">
          <React.Fragment>
            <Skeleton classes="title width-70" />
            <Skeleton classes="text width-40" />
            <Skeleton classes="text width-40" />
            <Skeleton classes="text width-40" />
            <br />
            <Skeleton classes="text width-pic" />
            <br />
            <Skeleton classes="text width-user" />
            <br />
            <Skeleton classes="text width-40" />
            <Skeleton classes="text width-delete" />
            <br />
          </React.Fragment>
        </div>
      )}
      {post && !loading && (
        <div className="postBg">
          <div id="posts" className="word-box">
            <div className="postsG" key={post._id}>
              <p className="postTitle">{post.title}</p>
              <br />
              <div className="bottom">
                <div className="postContents">{post.content}</div>
                <br />
                <br />
                <div className="imgs">
                  {post.pictureUrl.length > 1 &&
                    post.pictureUrl.map((image, index) => (
                      <section key={"multi" + image.filename}>
                        <button onClick={() => imagePreview(index, image)}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${image.filename}`}
                            alt={image.filename}
                            width="300"
                            height="300"
                            className="Images"
                          />
                        </button>
                        {check[index] && (
                          <img
                            src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${image.filename}`}
                            alt={image.filename}
                            id={`${post._id}-${index}`}
                            width={300 * scale}
                            height={300 * scale}
                            className="above"
                            onWheel={handleWheel}
                          />
                        )}
                        {check[index] && (
                          <button
                            id="closePreview"
                            onClick={() => handleCheckClose(index)}
                          >
                            X
                          </button>
                        )}
                        {backCheck && <div className="blocks" />}
                      </section>
                    ))}
                  {post.pictureUrl.length === 1 &&
                    post.pictureUrl.map((image, index) => (
                      <section key={"1pic" + image.filename}>
                        <button onClick={() => imagePreview1(postIndex, image)}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${image.filename}`}
                            alt={image.filename}
                            width="300"
                            height="300"
                            className="Image"
                          />
                        </button>
                        {ok && imgCheck[postIndex] && (
                          <img
                            src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${image.filename}`}
                            alt={image.filename}
                            width={300 * scale}
                            height={300 * scale}
                            className="above"
                            onWheel={handleWheel}
                          />
                        )}

                        {ok && imgCheck[postIndex] && (
                          <button
                            id="closePreview"
                            onClick={() => handleClose(postIndex)}
                          >
                            X
                          </button>
                        )}

                        {ok && imgCheck[postIndex] && (
                          <div className="blocks" />
                        )}
                      </section>
                    ))}
                </div>
                <br />
                <br />
                {post.postAnonymous !== "true" && (
                  <p className="usr">
                    {t("posted by")} {post.username}
                  </p>
                )}
                <br />
                <p className="postT">
                  {t("posted on")} {post.postingtime}
                </p>
                <br />
                <div className="likeContainer">
                  {
                    <LikeButton
                      key={like._id}
                      category="post"
                      postId={post._id}
                      likeloads={likeloads}
                      like={like}
                      likestatuses={likestatuses}
                      username={username}
                      setLikestatuses={setLikestatuses}
                      setLikes={setLikes}
                      size={50}
                      vershift="0.5vw"
                      shift="0.2vw"
                      height="76px"
                      type="individual"
                    />
                  }
                </div>

                {/* Comment Section */}
                <button
                  onClick={() => setCommentOpen(true)}
                  style={{ display: "flex", alignItems: "flex-end" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    width={40}
                    height={40}
                  >
                    <path
                      fill="#374151"
                      strokeWidth={0.5}
                      d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
                    ></path>
                  </svg>
                  <p style={{ position: "relative", marginBottom: "0.5vh" }}>
                    {t("Comments")}
                  </p>
                </button>
                {commentOpen && (
                  <>
                    <CommentUpload
                      fetchLikes={fetchLikes}
                      username={username}
                      postId={post._id}
                      commentOpen={commentOpen}
                      getComments={getComments}
                    />
                    <br />
                    {commentOpen && (
                      <div className="commentSection">
                        <div style={{ display: "flex", padding: "8px" }}>
                          <p>
                            {comments
                              ? comments.filter(
                                  (comment) => comment.postId === post._id,
                                ).length
                              : 0}
                          </p>{" "}
                          <p
                            style={{
                              position: "relative",
                              top: "0.25vh",
                              marginLeft: "0.25vw",
                            }}
                          >
                            {t("Comments")}
                          </p>
                        </div>
                        <hr
                          width="97%"
                          style={{
                            margin: "0 auto",
                            marginBottom: "1vh",
                            borderColor: "#C4C4C4",
                          }}
                        />
                        {comments &&
                          comments
                            .filter((comment) => comment.postId === post._id)
                            .map((com, index) => (
                              <>
                                <div key={com._id} style={{ padding: "8px" }}>
                                  <div style={{ display: "flex" }}>
                                    <h2 style={{ fontWeight: "700" }}>
                                      {com.username}
                                    </h2>
                                    {com.username === username && (
                                      <form onSubmit={deleteComment}>
                                        <input
                                          type="hidden"
                                          name="commentId"
                                          value={com._id}
                                        />
                                        <button
                                          type="submit"
                                          className="deleteBtn"
                                          style={{
                                            position: "absolute",
                                            right: "2.5vw",
                                            scale: "0.8",
                                          }}
                                        >
                                          <span>{t("Delete")}</span>
                                        </button>
                                      </form>
                                    )}
                                  </div>
                                  <div
                                    style={{
                                      whiteSpace: "pre-wrap",
                                      overflowWrap: "break-word",
                                    }}
                                  >
                                    {com.content}
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <h2 style={{}}>{com.postingtime}</h2>
                                    <button
                                      onClick={() => handleSubComment(com._id)}
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
                                        {t("Reply")}
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
                                          postId={com._id}
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
                                          type="individual"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  {addCommentDisplay.includes(com._id) && (
                                    <SubCommentUpload
                                      fetchLikes={fetchLikes}
                                      postId={post._id}
                                      username={username}
                                      commentId={com._id}
                                      commentOpen={addCommentDisplay.includes(
                                        com._id,
                                      )}
                                      getComments={getComments}
                                    />
                                  )}
                                </div>
                                {subComments &&
                                  subComments
                                    .filter(
                                      (subComment) =>
                                        subComment.postId === com._id,
                                    )
                                    .map((subComment, index) => (
                                      <SubComment
                                        key={subComment._id}
                                        likes={likes}
                                        likeloads={likeloads}
                                        likestatuses={likestatuses}
                                        setLikestatuses={setLikestatuses}
                                        username={username}
                                        subComment={subComment}
                                      />
                                    ))}
                              </>
                            ))}
                      </div>
                    )}
                  </>
                )}
                <br />
                {post.username === username && (
                  <div className="deleteForm">
                    <form onSubmit={handleSub} id="deleteForm">
                      <input type="hidden" name="id" id="id" value={post._id} />
                      <button type="submit" className="deleteBtn">
                        <span>{t("Delete")}</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>{" "}
            {/* posts mapping */}
          </div>
        </div>
      )}
    </section>
  );
}

export default Postform;
