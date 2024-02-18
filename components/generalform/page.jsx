"use client";
import "@/app/src/channels.css";
import React from "react";
import axios from "axios";
import { franc } from "franc-min";
import "@/app/i18n";
import Skeleton from "../skeletons/Skeleton";
import LikeButton from "../likeButton";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Picker } from "emoji-mart";
import { useTranslation } from "react-i18next";
import SubCommentUpload from "../subCommentUpload";
import ColorThief from "colorthief";
import CommentUpload from "../commentUpload";
import SubComment from "../subComment";
import { useEffect } from "react";

function Generalform({ username }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const [scale, setScale] = useState(1);
  const [check, setCheck] = useState([]);
  const [imgCheck, setImgCheck] = useState([]);
  const [ok, setOk] = useState(false);
  const [posts, setPosts] = useState([]);
  const [backCheck, setBackCheck] = useState(false);
  const [msg, setMsg] = useState(null);
  const [title, setTitle] = useState("");
  const [likes, setLikes] = useState([]);
  const [subComments, setSubComments] = useState([]);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [likestatuses, setLikestatuses] = useState([]);
  const [postAnonymous, setPostAnonymous] = useState(false);
  const [inputBoxHidden, setInputBoxHidden] = useState(true);
  const [likeloads, setLikeloads] = useState(true);
  const [likeload, setLikeload] = useState([]);
  const [commentLikeLoad, setCommentLikeLoad] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [commentOpen, setCommentOpen] = useState([].map(() => false));
  const [titleWords, setTitleWords] = useState(0);
  const [contentWords, setContentWords] = useState(0);
  const [titlerows, setTitleRows] = useState(1);
  const [contentrows, setContentRows] = useState(1);
  const [comments, setComments] = useState([]);
  // const [commentNumber, setCommentNumber] = useState([]);
  // The commentDisplay function is for showing the comment post button and the picturen upload button. If the content is focused, or in other words, the user is writing or editing the comment, it shows, else, we need to make space for showing other comments.
  const [addCommentDisplay, setAddCommentDisplay] = useState([]);
  const [admin, setAdmin] = useState(false);
  const { t } = useTranslation();
  const {i18n} = useTranslation();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/fetchAdmin", {
          username,
        });
        setAdmin(res.data.admin)
      } catch (error) {
        console.log("Error loading admin", error);
      }
    }
    fetchAdmin();
  },[])

  useEffect(() => {
    if(!localStorage.getItem("language")){
      localStorage.setItem("language", navigator.language.substring(0, 2));
    }
    const selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/general");

      if (res.status !== 200) {
        throw new Error("Failed to fetch posts");
      }
      setPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("Error loading posts", error);
    }
  };
  const fetchLikes = async () => {
    try {
      console.log("fetching likes");
      setLikeloads(true);
      const res = await axios.get("/api/fetchLike", {
        params: {
          username: username,
          forum: "general",
        },
      });
      setLikes(res.data.likes);
      setLikestatuses(res.data.likestatuses);
      setLikeloads(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (id) => {
    try {
      const response = await axios.get("/api/fetchComments", {
        params: {
          postId: id,
        },
      });

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
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    const commentId = e.target.commentId.value;
    const postId = e.target.postId.value;
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
  };

  // for future use to get number of comments
  // const getCommentNumber = async (index, id) => {
  //   try{
  //     const response = await axios.post('/api/fetchComments',
  //     {
  //       postId: id
  //     });
  //     const newArray = [...commentNumber];
  //     newArray[index] = response.data.commentNumber;
  //     setCommentNumber(newArray);
  //   } catch(error){
  //     console.log(error);
  //   }
  // }

  const imagePreview = (index, postIndex, img) => {
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

    let Array = [...imgCheck]; // create a copy of the current state
    Array[postIndex] = true; // set the first element to false
    setImgCheck(Array); // update the state
    setBackCheck(true);
    let newArray = [...check]; // create a copy of the current state
    newArray[index] = true; // set the first element to false
    setCheck(newArray); // update the state
  };

  const imagePreview1 = (postIndex, img) => {
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
    let Array = [...imgCheck]; // create a copy of the current state
    Array[postIndex] = true; // set the first element to false
    setImgCheck(Array); // update the state
    setOk(true);
  };

  const handleWheel = (e) => {
    setScale((prevScale) => {
      let newScale = prevScale + e.deltaY * -0.1;
      // Prevent the scale from becoming too small or negative
      newScale = Math.max(0.4, newScale);
      // Prevent the scale from becoming too large
      newScale = Math.min(2, newScale);
      return newScale;
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === undefined && username === null) {
      alert("You must login to post");
      return;
    }

    if (title === null || title === undefined) {
      alert("Title cannot be empty");
      return;
    } else if (content === null || content === undefined) {
      alert("Content cannot be empty");
      return;
    } else if (title.split(" ").filter((word) => word).length > 20) {
      alert("Title cannot be more than 20 words");
      return;
    } else if (content.split(" ").filter((word) => word).length > 1000) {
      alert("Content cannot be more than 1000 words");
      return;
    }

    if (files.length === 0 && !title && !content) {
      alert(
        "No files, title, or content. Please provide at least one of them.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postAnonymous", postAnonymous);
    formData.append("group", "general");
    formData.append("username", username);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    try {
      setLoad(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SOURCE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status === 201) {
        await getPosts();
        setLoad(false);
        handleCloseFormClick();
        setMsg("Post created successfully");
        setTitle("");
        setContent("");
        setContentWords(0);
        setTitleWords(0);
        setFiles([]);
        setPostAnonymous(false);
      }
      fetchLikes();
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const handleAddPostClick = () => {
    setInputBoxHidden(!inputBoxHidden);
  };

  const handleCloseFormClick = () => {
    setInputBoxHidden(true);
  };

  const handleCheckClose = (index, postIndex) => {
    let Array = [...check]; // create a copy of the current state
    Array[postIndex] = false; // set the first element to false
    setImgCheck(Array); // update the state
    let newArray = [...check]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setCheck(newArray); // update the state
    setBackCheck(false);
    document.documentElement.style.setProperty("--1-color", "#f2f4f5");
    document.documentElement.style.setProperty("--2-color", "#f2f4f5");
    document.documentElement.style.setProperty("--3-color", "#f2f4f5");
    document.body.style.overflowY = "scroll";
  };

  const handleClose = (index) => {
    setOk(false);
    let newArray = [...imgCheck]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setImgCheck(newArray); // update the state
    document.documentElement.style.setProperty("--1-color", "#f2f4f5");
    document.documentElement.style.setProperty("--2-color", "#f2f4f5");
    document.documentElement.style.setProperty("--3-color", "#f2f4f5");
    document.body.style.overflowY = "scroll";
  };

  const getSpec = async () => {};

  //   useEffect(() => {
  //     const imagesPreview = (input, placeToInsertImagePreview) => {
  //       if (input.files) {
  //         const filesAmount = input.files.length;
  //         for (let i = 0; i < filesAmount; i++) {
  //           const reader = new FileReader();
  //           reader.onload = function(event) {
  //             const img = document.createElement('img');
  //             img.src = event.target.result;
  //             img.style.width = '100px'; // Set the image width
  //             img.style.height = '100px'; // Set the image height
  //             img.style.objectFit = 'cover'; // Set the object-fit property
  //             img.style.margin = '10px'; // Set the margin
  //             placeToInsertImagePreview.appendChild(img);
  //           };
  //           reader.readAsDataURL(input.files[i]);
  //         }
  //       }
  //     };

  //     const inputFilesElement = document.getElementById('input-files');
  //     const previewImagesElement = document.querySelector('div.preview-images');

  //     if (inputFilesElement) {
  //       inputFilesElement.addEventListener('change', () => imagesPreview(inputFilesElement, previewImagesElement));
  //     }
  //     // Cleanup function
  //   return () => {
  //     if (inputFilesElement) {
  //       inputFilesElement.removeEventListener('change', () => imagesPreview(inputFilesElement, previewImagesElement));
  //     }
  //   };
  // }, []);

  const handleSub = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("/api/general", {
        data: {
          id: e.target.id.value,
        },
      });
      await getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = async () => {
    await getPosts();
    await fetchLikes();
    setCommentOpen([].map(() => false));
  };

  const handleComment = async (postId) => {
    const ind = commentOpen.includes(postId);
    if (ind) {
      setCommentOpen(commentOpen.filter((id) => id !== postId));
    } else {
      setCommentOpen([...commentOpen, postId]);
    }
    if (!ind) await getComments(postId);
  };

  const handleSubComment = (commentId) => {
    const ind = addCommentDisplay.includes(commentId);
    if (ind) {
      setAddCommentDisplay(addCommentDisplay.filter((id) => id !== commentId));
    } else {
      setAddCommentDisplay([...addCommentDisplay, commentId]);
    }
  };

  useEffect(() => {
    getPosts();
    fetchLikes();
  }, []);

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
          reject(new Error(`Failed to load image after ${maxTries} attempts`));
        }
      };

      img.src = src;
    });
  };

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
  }, [posts]);

  return (
    <>
      <title>{t("General")}</title>
      <div id="topBar">
        <a href="intro" className="titleg">
          {t("General")}
        </a>
      </div>
      <br />
      <br />
      <a href="dashboard" id="backButton">
        {t("Back to Dashboard")}
      </a>
      <button className="refreshBtn" onClick={handleRefresh}>
        {t("Refresh")}
      </button>
      <button className="adp" id="GaddPostBtn" onClick={handleAddPostClick}>
        <span>{t("Write a post")}</span>
      </button>
      {!inputBoxHidden && (
        <div id="inputBoxGeneral">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            id="postForm"
            encType="multipart/form-data"
          >
            <textarea
              required
              id="title"
              name="title"
              rows={1}
              placeholder={t("Enter title (20 words max)")}
              onInput={(e) => {
                const value = e.target.value;
                setTitleWords(value.split(" ").filter((word) => word).length);
                setTitle(value); // Update title state
                e.target.style.height = "40px";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onFocus={(e) => {
                e.target.style.color = "black";
                e.target.style.height = "40px";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onBlur={(e) => {
                e.target.style.color = "gray";
              }}
              value={title}
            />
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  fontSize: "0.85rem",
                  right: "12vw",
                  bottom: "0.6vh",
                }}
              >
                {titleWords}
              </span>
            </div>
            <br />
            <br />
            <textarea
              required
              id="content"
              name="content"
              rows={1}
              placeholder={t("Write sth...")}
              onInput={(e) => {
                const value = e.target.value;
                const detectedLanguage = franc(value);
                let wordCount;
                if (
                  detectedLanguage === "eng" ||
                  detectedLanguage === "cmn" ||
                  detectedLanguage === "jpn"
                ) {
                  wordCount = value.length;
                } else {
                  // 对于其他语言，你可能需要添加更多的条件分支
                }
                setContentWords(wordCount);
                setContent(value); // Update title state
                e.target.style.height = "40px";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onFocus={(e) => {
                e.target.style.color = "black";
                e.target.style.height = "40px";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onBlur={(e) => {
                e.target.style.color = "gray";
              }}
              value={content}
            />
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  fontSize: "0.85rem",
                  right: "0.5vw",
                  bottom: "0.5vh",
                }}
              >
                {contentWords}
              </span>
            </div>
            <br />
            <br />
            <label htmlFor="input-files" className="picUpload">
              {t("Pictures")}
              <input
                type="file"
                id="input-files"
                className="form-control-file border"
                onChange={handleFileChange}
                multiple
              />
            </label>
            <div className="formBottom">
              <button
                type="submit"
                className="postBtn"
                disabled={load}
                onClick={() => {
                  setContent(document.getElementById("content").textContent),
                    setTitle(document.getElementById("title").textContent);
                }}
              >
                {!load && <p className="ldd">{t("Post")}</p>}
                {load && (
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
                )}
              </button>
              <button className="closeForm" onClick={handleCloseFormClick}>
                <p>{t("Cancel")}</p>
              </button>
              <div className="switchForm">
                <label className="switch">
                  <input
                    type="checkbox"
                    name="postAnonymous"
                    checked={postAnonymous}
                    onChange={() => setPostAnonymous(!postAnonymous)}
                  />
                  <span className="slider round">
                    <h6 className="posta">
                      {t("Anon")}
                      <p />
                    </h6>
                  </span>
                </label>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-sm-12">
              <div className="preview-images" />
            </div>
          </div>
        </div>
      )}
      <div className="bg">
        <div id="posts" className="word-box">
          {loading
            ? Array.from({ length: 15 }).map((_, i) => (
                <div className="borderClass" key={`Skeletons${i}`}>
                  <React.Fragment>
                    <Skeleton classes="title width-40" />
                    <Skeleton classes="text width-70" />
                    <Skeleton classes="text width-70" />
                    <Skeleton classes="text width-70" />
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
              ))
            : posts.map((post, postIndex) => (
                <div className="postsG" key={post._id}>
                  <div className="ptitle">{post.title}</div>
                  <br />
                  <div className="contents">{post.content}</div>
                  <br />
                  <br />
                  <div className="imgs">
                    {post.pictureUrl.length > 1 &&
                      post.pictureUrl.map((image, index) => (
                        <section key={"multi" + image.filename}>
                          <button
                            onClick={() =>
                              imagePreview(index, postIndex, image)
                            }
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${image.filename}`}
                              alt={image.filename}
                              width="300"
                              height="300"
                              className="Images"
                            />
                          </button>
                          {check[index] && imgCheck[postIndex] && (
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
                          {check[index] && imgCheck[postIndex] && (
                            <button
                              id="closePreview"
                              onClick={() => handleCheckClose(index, postIndex)}
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
                          <button
                            onClick={() => imagePreview1(postIndex, image)}
                          >
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
                  {(post.postAnonymous !== "true" || admin == true) && (
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
                    {likes.map((like, likeIndex) => (
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
                      />
                    ))}
                  </div>

                  {/* Comment Section */}
                  <button
                    onClick={() => handleComment(post._id)}
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
                  {commentOpen.includes(post._id) && (
                    <>
                      <CommentUpload
                        fetchLikes={fetchLikes}
                        username={username}
                        postId={post._id}
                        commentOpen={commentOpen}
                        getComments={getComments}
                      />
                      <br />
                      {commentOpen.includes(post._id) && (
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
                                      {admin && (
                                        <form onSubmit={deleteComment}>
                                          <input
                                            type="hidden"
                                            name="commentId"
                                            value={com._id}
                                          />
                                          <input
                                            type="hidden"
                                            name="postId"
                                            value={post._id}
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
                                            <span>{t("Admin Delete")}</span>
                                          </button>
                                        </form>
                                      )}
                                      {!admin && com.username === username && (
                                        <form onSubmit={deleteComment}>
                                          <input
                                            type="hidden"
                                            name="commentId"
                                            value={com._id}
                                          />
                                          <input
                                            type="hidden"
                                            name="postId"
                                            value={post._id}
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
                                        onClick={() =>
                                          handleSubComment(com._id)
                                        }
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
                                          setLikes={setLikes}
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

                  {/* picture upload svg (no need for now) */}
                  {/* <?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="149"	 height="132">
<path d="M143.209,105.968c0,6.25-5.113,11.364-11.363,11.364H18.203c-6.25
0-11.363-5.113-11.363-11.364v-86.37c0-6.25,5.113-11.363
11.363-11.363h113.643c6.25,0,11.363,5.113,11.363,11.363V105.968z
M18.203,17.326c-1.207,0-2.271,1.068-2.271,2.271v86.37c0,1.207,1.065
2.271,2.271,2.271h113.643c1.203,0,2.274-1.064
2.274-2.271v-86.37c0-1.203-1.071-2.271-2.274-2.271H18.203z
M38.661,53.691c-7.529,0-13.641-6.108-13.641-13.635s6.112-13.638,13.641-13.638
c7.526,0,13.632,6.111,13.632,13.638S46.188,53.691,38.661,53.691z
M125.025,99.15H25.02V85.51l22.73-22.724l11.363,11.36l36.365-36.361l29.547,29.547V99.15z"/>
</svg> */}

                  {/* loading state for comments (have not editted) */}
                  {/* Array.from({ length: 15 }).map((_, i) => (
                <div className="borderClass" key={i}>
                  <React.Fragment>
                    <Skeleton classes="title width-40" />
                    <Skeleton classes="text width-70" />
                    <Skeleton classes="text width-70" />
                    <Skeleton classes="text width-70" />
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
              )) */}
                  <br />
                  {post.username === username && !admin && (
                    <div className="deleteForm">
                      <form onSubmit={handleSub} id="deleteForm">
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={post._id}
                        />
                        <button type="submit" className="deleteBtn">
                          <span>{t("Delete")}</span>
                        </button>
                      </form>
                    </div>
                  )}
                  {admin && (
                    <div className="deleteForm">
                      <form onSubmit={handleSub} id="deleteForm">
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={post._id}
                        />
                        <button type="submit" className="deleteBtn">
                          <span>{t("Admin Delete")}</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
      <div id="spacing" />
      <br />
    </>
  );
}

export default Generalform;
