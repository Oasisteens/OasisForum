"use client";
import "../../app/src/channels.css";
import React from "react";
import axios from "axios";
import Skeleton from "./skeletons/Skeleton";
import { useState, useRef } from "react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import { Picker } from "emoji-mart";
import "../../app/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Newsform({ username }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const [scale, setScale] = useState(1);
  const [check, setCheck] = useState([]);
  const [imgCheck, setImgCheck] = useState([]);
  const [ok, setOk] = useState(false);
  const [news, setNews] = useState([]);
  const [backCheck, setBackCheck] = useState(false);
  const [msg, setMsg] = useState(null);
  const [title, setTitle] = useState("");
  const [likes, setLikes] = useState([]);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [likestatuses, setLikestatuses] = useState([]);
  const [postAnonymous, setPostAnonymous] = useState(false);
  const [inputBoxHidden, setInputBoxHidden] = useState(true);
  const [likeloads, setLikeloads] = useState(true);
  const [likeload, setLikeload] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [admi, setAdmi] = useState(false);

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
  }, []);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.post("/api/fetchAdmin", {
          username: username,
        });
        setAdmi(res.data.admin);
      } catch (error) {
        console.log("Error loading admin", error);
      }
    };
    fetchAdmin();
  }, []);

  const admin = admi;
  let newArray;

  const { t } = useTranslation();
  const { i18n } = useTranslation();

  // Pull info(language) from localStorage
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", navigator.language.substring(0, 2));
    }
    const selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/fetchNews");

      if (res.status !== 200) {
        throw new Error("Failed to fetch news");
      }
      setNews(res.data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("Error loading news", error);
    }
  };
  // const fetchLikes = async () => {
  //   try {
  //     setLikeloads(true);
  //     const res = await axios.get("/api/fetchLike", {
  //       params: {
  //         forum: "news",
  //         username: username,
  //       },
  //     });
  //     setLikes(res.data.likes);
  //     setLikestatuses(res.data.likestatuses);
  //     setLikeloads(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const imagePreview = (index, postIndex) => {
    document.body.style.overflowY = "hidden";
    let Array = [...imgCheck]; // create a copy of the current state
    Array[postIndex] = true; // set the first element to false
    setImgCheck(Array); // update the state
    setBackCheck(true);
    let newArray = [...check]; // create a copy of the current state
    newArray[index] = true; // set the first element to false
    setCheck(newArray); // update the state
  };

  const imagePreview1 = (postIndex) => {
    document.body.style.overflowY = "hidden";
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
    formData.append("group", "news");
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
        await fetchNews();
        setLoad(false);
        handleCloseFormClick();
        setMsg("Post created successfully");
        setTitle("");
        setContent("");
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
    setInputBoxHidden(false);
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
    document.body.style.overflowY = "scroll";
  };

  const handleClose = (index) => {
    setOk(false);
    let newArray = [...imgCheck]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setImgCheck(newArray); // update the state
    document.body.style.overflowY = "scroll";
  };

  const handleSub = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete("/api/fetchNews", {
        data: {
          id: e.target.id.value,
        },
      });
      await fetchNews();
    } catch (error) {
      console.log(error);
    }
  };

  // const sendLike = async (category, likeIndex, e) => {
  //   e.preventDefault();
  //   try {
  //     newArray = [...likeload];
  //     newArray[likeIndex] = true;
  //     setLikeload(newArray);
  //     const postId = e.target.id.value;
  //     const likestatus = likestatuses?.find(
  //       (likestatus) => likestatus.postId === postId,
  //     );
  //     const currentStatus = likestatus?.status ?? false;
  //     const res = await axios.post("/api/fetchLike", {
  //       postId,
  //       sendUsername: username,
  //       status: !currentStatus,
  //       category,
  //     });
  //     setLikestatuses(res.data.likestatuses);
  //     setLikes(res.data.likes);
  //     newArray[likeIndex] = false;
  //     setLikeload(newArray);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRefresh = async () => {
    await fetchNews();
    // await fetchLikes();
  };

  useEffect(() => {
    fetchNews();
    // fetchLikes();
  }, []);
  return (
    <>
      <title>{t("News")}</title>
      <div id="topBar">
        <a href="intro" className="titleg">
          {t("News")}
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
      {admin && (
        <button className="adp" id="GaddPostBtn" onClick={handleAddPostClick}>
          <span>{t("Write News")}</span>
        </button>
      )}
      {!inputBoxHidden && (
        <div id="inputBoxGeneral">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            id="postForm"
            encType="multipart/form-data"
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="title"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="content">Write sth: </label>
            <textarea
              id="content"
              required
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <br />
            <label htmlFor="input-files">
              Pictures:
              <input
                type="file"
                id="input-files"
                className="form-control-file border"
                onChange={handleFileChange}
                multiple
              />
            </label>
            <div className="formBottom">
              <button type="submit" className="postBtn" disabled={load}>
                {!load && <p className="ldd">Post</p>}
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
                Cancel
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
                      Anon?
                      <p />
                    </h6>
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="bg">
        <div id="posts" className="word-box">
          <br />
          {loading
            ? Array.from({ length: 15 }).map((_, i) => (
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
              ))
            : news.map((post, postIndex) => (
                <div className="postsG" key={postIndex}>
                  <div>
                    <h3>{post.title}</h3>
                    <br />
                    <div className="contents">{post.content}</div>
                    <br />
                    <br />
                    <div className="imgs">
                      {post.pictureUrl.length > 1 &&
                        post.pictureUrl.map((image, index) => (
                          <>
                            <button
                              onClick={() => imagePreview(index, postIndex)}
                            >
                              <img
                                src={`/${image.filename}`}
                                key={index}
                                alt={image.filename}
                                width="300"
                                height="300"
                                className="Images"
                              />
                            </button>
                            {check[index] && imgCheck[postIndex] && (
                              <img
                                src={`/${image.filename}`}
                                key={index}
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
                                onClick={() =>
                                  handleCheckClose(index, postIndex)
                                }
                              >
                                X
                              </button>
                            )}
                            {backCheck && <div className="blocks" />}
                          </>
                        ))}
                      {post.pictureUrl.length === 1 &&
                        post.pictureUrl.map((image, index) => (
                          <>
                            <button onClick={() => imagePreview1(postIndex)}>
                              <img
                                src={`/${image.filename}`}
                                key={index}
                                alt={image.filename}
                                width="300"
                                height="300"
                                className="Image"
                              />
                            </button>
                            {ok && imgCheck[postIndex] && (
                              <img
                                src={`/${image.filename}`}
                                key={index}
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
                          </>
                        ))}
                    </div>
                    <br />
                    <p className="postT">
                      {t("posted on")} {post.postingtime}
                    </p>
                    <br />
                    {/* <div className="likeContainer">
                      {likes.map((like, likeIndex) => (
                        <>
                          {like.postId === post._id &&
                            !(likeloads || likeload[likeIndex]) && (
                              <>
                                <form
                                  onSubmit={(e) =>
                                    sendLike("post", likeIndex, e)
                                  }
                                  disabled={likeloads || likeload[likeIndex]}
                                  key={likeIndex}
                                >
                                  <input
                                    type="hidden"
                                    name="id"
                                    id="id"
                                    value={post._id}
                                  />
                                  <button
                                    className="likeBtn"
                                    type="submit"
                                    id={`like${post._id}`}
                                  >
                                    {(() => {
                                      const likestatus = likestatuses.find(
                                        (likestatus) =>
                                          likestatus.postId === post._id &&
                                          likestatus.username === username,
                                      );
                                      return likestatus && likestatus.status ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="red"
                                          width={50}
                                          height={50}
                                          className="heart"
                                          viewBox="0 0 512 512"
                                        >
                                          <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
                                        </svg>
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={50}
                                          className="heart"
                                          height={50}
                                          viewBox="0 0 512 512"
                                        >
                                          <path
                                            d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                            fill="none"
                                            stroke="black"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={20}
                                          />
                                        </svg>
                                      );
                                    })()}
                                  </button>
                                </form>
                                <p key={like.number} className="postlike">
                                  {like.number}
                                </p>
                              </>
                            )}

                          {like.postId === post._id &&
                            (likeloads || likeload[likeIndex]) && (
                              <div className="likeLoad" key={post._id}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="red"
                                  width={50}
                                  height={50}
                                  className="loadHeart"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
                                </svg>
                              </div>
                            )}
                        </>
                      ))}
                    </div> */}
                    {/* <button onClick={openCommentForm}>
                      Add a Comment
                    </button>
                    <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          id="postForm"
          encType="multipart/form-data"
        >
          <button onClick={closeCommentForm}>
            <Image src={Cancel} alt="cancel" height="40" width="40" />
          </button>
          <input
            type="text"
            className="title"
            id="title"
            name="title"
            placeholder="Title:/optional"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <textarea
            required
            name="content"
            placeholder="Comment on this post:"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          <br />
          <label htmlFor="input-files">Pictures:</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
          />
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
                  Anonymously?
                  <p />
                </h6>
              </span>
            </label>
          </div>
          <button type="submit" className="postBtn" disabled={load}>
            {!load && <p className="ldd">Post</p>}
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
        </form> */}
                    <br />
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
                            <span>Admin Delete</span>
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div id="spacing" />
      <br />
    </>
  );
}

export default Newsform;
