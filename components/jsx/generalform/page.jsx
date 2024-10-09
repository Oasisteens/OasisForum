"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
// import { Picker } from "emoji-mart";
import ColorThief from "colorthief";
import count from "word-count";
import { truncate } from "lodash";
import styles from "../../../app/src/channels.module.css";
import "../../../app/src/channels.color.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../app/i18n";
import Skeleton from "../skeletons/Skeleton";
import LikeButton from "../likeButton";
import SubCommentUpload from "../subCommentUpload";
import CommentUpload from "../commentUpload";
import SubComment from "../subComment";
import GetCommentNum from "../getCommentNum.jsx";

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
  const [likeloads, setLikeloads] = useState(true);
  // const [likeload, setLikeload] = useState([]);
  const [hide, setHide] = useState(false);
  // const [commentLikeLoad, setCommentLikeLoad] = useState(null);
  // const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [bottomLoad, setBottomLoad] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [lastPostId, setLastPostId] = useState(null);
  const [commentOpen, setCommentOpen] = useState([].map(() => false));
  const [titleWords, setTitleWords] = useState(0);
  const [contentWords, setContentWords] = useState(0);
  const [comments, setComments] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [commentUploadRefresh, setCommentUploadRefresh] = useState(
    [].map(() => false),
  );
  // const [commentNumber, setCommentNumber] = useState([]);
  // The commentDisplay function is for showing the comment post button and the picturen upload button. If the content is focused, or in other words, the user is writing or editing the comment, it shows, else, we need to make space for showing other comments.
  const [addCommentDisplay, setAddCommentDisplay] = useState([]);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [noMore, setNoMore] = useState(false);
  const [globalRefresh, setGlobalRefresh] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const modalRef = useRef(); //the ref for post submission modal (dialog)

  useEffect(() => {
    import("bootstrap");
  }, []); //bootstrap dynamic import

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap").then(({ Modal }) => {
        const handleHide = () => {
          if (hide && modalRef.current) {
            const modal = Modal.getInstance(modalRef.current);
            if (modal) {
              modal.hide();
            }
          }
        };
        handleHide();
        setHide(false);
      });
    }
  }, [hide]); //hide modal

  useEffect(() => {
    commentUploadRefresh.forEach(async (postId) => {
      await getComments(postId);
      setCommentUploadRefresh(
        commentUploadRefresh.filter((id) => id !== postId),
      );
    });
  }, [commentUploadRefresh]);

  const getPosts = async (needLoading, type = "top") => {
    if (isFetching) return;
    try {
      setIsFetching(true);
      needLoading && setLoading(true);
      type === "bottom" && setBottomLoad(true);
      const res = await axios.get("/api/general", {
        params: {
          cursor: posts?.[posts.length - 1]?._id,
          limit: 9,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch posts");
      }

      setNoMore(res.data.posts.length === 0);
      // 将新获取的帖子和现有的帖子合并成一个新的数组
      const allPosts = [...posts, ...res.data.posts];

      // 在新的数组中检查重复的帖子
      const hasDuplicate = allPosts.some(
        (post, index) =>
          allPosts.findIndex((p) => p._id === post._id) !== index,
      );

      if (hasDuplicate) {
        console.log("Duplicate posts found, aborting");
        return;
      }

      // 将新的数组设置为新的 posts 状态
      setPosts(allPosts);

      setIsFetching(false);
      needLoading && setLoading(false);
      type === "bottom" && setBottomLoad(false);
    } catch (error) {
      needLoading && setLoading(false);
      type === "bottom" && setBottomLoad(false);
      setIsFetching(false);
      setError(true);
      console.log("Error loading posts", error);
    }
  }; //get posts

  const initPosts = async () => {
    if (isFetching) return;
    try {
      setIsFetching(true);
      setLoading(true);
      const res = await axios.get("/api/general", {
        params: {
          cursor: null,
          limit: 9,
        },
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch posts");
      }
      setNoMore(res.data.posts.length === 0);
      setPosts(res.data.posts);
      setIsFetching(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsFetching(false);
      setError(true);
      console.log("Error loading posts", error);
    }
  }; //init posts

  useEffect(() => {
    const lastIndex = posts?.[posts.length - 1]?._id;

    if (lastIndex === lastPostId && !globalRefresh) return;

    setLastPostId(lastIndex);

    const lastPost = document.getElementById(lastIndex);

    if (lastPost) {
      const observer = new IntersectionObserver(
        async (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              await getPosts(false, "bottom");
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0 },
      );

      observer.observe(lastPost);
    }

    setGlobalRefresh(false);
  }, [posts, lastPostId, globalRefresh]); //fetch posts when the last post is in the viewport

  const fetchLikes = async () => {
    try {
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
  }; //fetchlikes from server

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
  }; //get comments for post in which its _id is equal to id

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
  }; //delete a specific comment

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

    // 确保在浏览器环境中使用 Image
    if (typeof window !== "undefined") {
      const image = new window.Image();
      image.crossOrigin = "Anonymous";
      image.src = img.filename ? `/uploads/${img.filename}` : "";

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
    } else {
      console.error("Image loading is not supported in this environment");
    }
  }; //preview images (>=2)

  const imagePreview1 = (postIndex, img) => {
    document.body.style.overflowY = "hidden";
    const colorThief = new ColorThief();

    // 确保在浏览器环境中使用 Image
    if (typeof window !== "undefined") {
      const image = new window.Image();
      image.crossOrigin = "Anonymous";
      image.src = img.filename ? `/uploads/${img.filename}` : "";

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
      setOk(true);
    } else {
      console.error("Image loading is not supported in this environment");
    }
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

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.mp4|\.mov)$/i;

    if (uploadedFiles.length + files.length > 9) {
      alert("You can only upload up to 9 files.");
      event.target.value = "";
      return;
    }

    uploadedFiles.forEach((file) => {
      if (!allowedExtensions.exec(file.name)) {
        alert("Invalid file type. Only images and videos are allowed.");
        event.target.value = "";
      } else {
        const url = URL.createObjectURL(file);
        setFileUrls((prevUrls) => [...prevUrls, url]);
        setFiles((prevFiles) => [...prevFiles, file]);
      }
    });
  }; //add file through file input in post submission

  const handleDropFile = (event) => {
    event.preventDefault();
    const uploadedFiles = Array.from(event.dataTransfer.files);
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.mp4|\.mov)$/i;

    if (uploadedFiles.length + files.length > 9) {
      alert("You can only upload up to 9 files.");
      return;
    }

    uploadedFiles.forEach((file) => {
      if (!allowedExtensions.exec(file.name)) {
        alert("Invalid file type. Only images and videos are allowed.");
      } else {
        const url = URL.createObjectURL(file);
        setFileUrls((prevUrls) => [...prevUrls, url]);
        setFiles((prevFiles) => [...prevFiles, file]);
      }
    });
  }; //add file through drag and drop in post submission

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
    setFileUrls((prevUrls) => prevUrls.filter((url, i) => i !== index));
  }; //remove file in post submission

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
    } else if (titleWords > 20) {
      alert("Title cannot be more than 20 words");
      return;
    } else if (contentWords > 1000) {
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
        `/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status === 201) {
        await initPosts();
        setLoad(false);
        setMsg("Post created successfully");
        setHide(true);
        setTitle("");
        setContent("");
        setContentWords(0);
        setTitleWords(0);
        setFiles([]);
        setFileUrls([]);
        setPostAnonymous(false);
      }
      // fetchLikes();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        alert(t("Too many requests. Please try again later."));
        return;
      }
      setLoad(false);
    }
  }; //submit post

  const handleAddPostClick = () => {
    if (!username) {
      alert(t("Please sign in to write a post"));
      return;
    }
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
  }; //setting for image preview

  const handleClose = (index) => {
    setOk(false);
    let newArray = [...imgCheck]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setImgCheck(newArray); // update the state
    document.documentElement.style.setProperty("--1-color", "#f2f4f5");
    document.documentElement.style.setProperty("--2-color", "#f2f4f5");
    document.documentElement.style.setProperty("--3-color", "#f2f4f5");
  }; //setting for image preview1

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("/api/general", {
        data: {
          id: e.target.id.value,
        },
      });
      await initPosts();
      await fetchLikes();
    } catch (error) {
      console.log(error);
    }
  }; //delete post

  const handleRefresh = async (e) => {
    e.preventDefault();
    try {
      setCommentOpen([]);
      setCommentUploadRefresh([]);
      await initPosts();
      await fetchLikes();
      setGlobalRefresh(true);
    } catch (error) {
      console.log(error);
    }
  }; //refresh page

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
    if (!username) {
      alert(t("Please sign in to write a comment"));
      return;
    }
    const ind = addCommentDisplay.includes(commentId);
    if (ind) {
      setAddCommentDisplay(addCommentDisplay.filter((id) => id !== commentId));
    } else {
      setAddCommentDisplay([...addCommentDisplay, commentId]);
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      getPosts(true);
    }
    fetchLikes();
  }, []); //initial setup

  const loadImage = (src, maxTries = 3) => {
    // 增加空值检查
    if (!src) {
      console.error("Image source is required");
      return Promise.reject("Image source is required");
    }

    return new Promise((resolve, reject) => {
      let tries = 0;

      // 确保在浏览器环境中使用 Image
      if (typeof window !== "undefined") {
        const img = new window.Image();

        img.onload = () => resolve("Image loaded successfully");
        img.onerror = () => {
          tries++;
          if (tries < maxTries) {
            img.src = src;
          } else {
            console.error(`Failed to load image after ${maxTries} attempts`);
            reject(`Failed to load image after ${maxTries} attempts`);
          }
        };

        img.src = src;
      } else {
        console.error("Image loading is not supported in this environment");
        reject("Image loading is not supported in this environment");
      }
    });
  }; //load image

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(
          posts.map((post) =>
            post.pictureUrl.map((image) => loadImage(`/${image.filename}`)),
          ),
        );
      } catch (error) {
        console.log("One or more images failed to load", error);
      }
    };

    loadImages();
  }, [posts]); //load images

  const toggleExpand = (id) => {
    var newArray = [...isExpanded];
    newArray.push(id);
    setIsExpanded(newArray);
  }; //toggle expand

  const displayContent = (content, id, length = 103) => {
    if (isExpanded.includes(id)) {
      return content;
    } else {
      const indices = [];
      const noSpaces = [...content]
        .filter((c, i) => {
          if (c !== " ") {
            indices.push(i);
            return true;
          }
          return false;
        })
        .join("");

      const truncated = truncate(noSpaces, { length: length, omission: "" });

      let result = "";
      let j = 0;
      for (let i = 0; i < content.length && j < truncated.length; i++) {
        if (i === indices[j]) {
          result += truncated[j];
          j++;
        } else {
          result += " ";
        }
      }

      return result + (truncated.length < noSpaces.length ? "..." : "");
    }
  };

  const getAvatar = async (username) => {
    try {
      const res = await axios.get("/api/getAvatar", {
        params: {
          username: username,
        },
      });
      return res.data.avatarUrl;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        const newLoadedSrc = {};
        await Promise.all(
          posts.map(async (post) => {
            const avatarUrlProp = await getAvatar(post.username);
            const avatarUrl = avatarUrlProp ? `/avatar/${avatarUrlProp}` : null;
            if (avatarUrl && avatarUrl !== null) {
              newLoadedSrc[post._id] = avatarUrl;
            }
          }),
        );

        setLoadedSrc(newLoadedSrc);
      } catch (error) {
        console.log("One or more images failed to load", error);
      }
    };

    loadImages();
  }, [posts]); //load avatars
  return (
    <section className={styles.posts}>
      <title>{t("General")}</title>
      <div className={styles.topBar}>
        <Link href="/" className={styles.iconContainer}>
          <Image
            src="/icons/chatbubbles-outline.svg"
            width="50"
            height="50"
            alt="chatbubbles"
          />
          <p className={styles.webicon} href="/">
            {t("Oasis")}
          </p>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <div className={styles.postBody}>
        <div className={styles.generalNav}>
          <ul
            className="nav flex-column nav-pills"
            id="pills-tab"
            role="tablist"
          >
            <li className={`${styles.navItem} nav-item`} role="presentation">
              <Link
                className={`${styles.navLink} nav-link`}
                aria-current="page"
                href="/dashboard"
              >
                <i style={{ fontSize: "1.8rem" }} className="bi bi-house" />
                <p style={{ margin: "0", fontSize: "1rem" }}>
                  {t("Back to Dashboard")}
                </p>
              </Link>
            </li>
            <li className={`${styles.navItem} nav-item`} role="presentation">
              <button
                className={`${styles.navLink} nav-link`}
                onClick={handleRefresh}
              >
                <i
                  style={{ fontSize: "1.8rem" }}
                  className={`${styles.arrowRotate} bi bi-arrow-repeat`}
                />
                <p style={{ margin: "0", fontSize: "1rem" }}>{t("Refresh")}</p>
              </button>
            </li>
            <li className={`${styles.navItem} nav-item`} role="presentation">
              <button
                className={`${styles.navLink} nav-link`}
                onClick={handleAddPostClick}
                data-bs-toggle={username && "modal"}
                data-bs-target={username && "#postModal"}
              >
                <i style={{ fontSize: "1.8rem" }} className="bi bi-pen" />
                <p style={{ margin: "0", fontSize: "1rem" }}>
                  {t("Write a post")}
                </p>
              </button>
            </li>
          </ul>
        </div>
        {/* <div className={styles.topBtnContainer}>
          <button className={styles.refreshBtn} onClick={handleRefresh}>
            {t("Refresh")}
          </button>{" "}
        </div> */}
        <br />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "start",
            width: "36vw",
            gap: "5px",
            position: "relative",
            marginLeft: "45vw",
            top: "10rem",
          }}
        >
          {/* add post button */}
          <div
            className="modal fade"
            id="postModal"
            tabIndex={-1}
            aria-labelledby="postModalLabel"
            aria-hidden="true"
            ref={modalRef}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                {/* <div className="modal-header">
              <h5 className="modal-title" id="initiateTradeModalLabel">
                Initiate Trade
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div> */}
                <div className="modal-body">
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                    encType="multipart/form-data"
                  >
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        {t("Enter title (20 words max)")}
                      </label>
                      <TextareaAutosize
                        className="form-control"
                        id="title"
                        value={title}
                        onInput={(e) => {
                          const value = e.target.value;
                          const wordCount = count(value);
                          setTitleWords(wordCount);
                          setTitle(value); // Update title state
                        }}
                        required
                      />
                      <span
                        className="text-primary-emphasis"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {titleWords}
                        {titleWords !== 0
                          ? t(" words in total")
                          : t(" word in total")}
                      </span>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">
                        {t("Write sth...")}
                      </label>
                      <TextareaAutosize
                        required
                        className="form-control"
                        name="content"
                        onInput={(e) => {
                          const value = e.target.value;
                          const wordCount = count(value);
                          setContentWords(wordCount);
                          setContent(value); // Update title state
                        }}
                        value={content}
                      />
                      <span
                        className="text-primary-emphasis"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {contentWords}
                        {contentWords !== 0
                          ? t(" words in total")
                          : t(" word in total")}
                      </span>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputFiles" className="form-label">
                        {files.length > 1 &&
                          `${files.length}${t(" files has been uploaded")}`}
                        {files.length === 1 &&
                          `${files.length}${t(" file has been uploaded")}`}
                        {!(files.length > 1) &&
                          !(files.length === 1) &&
                          t("Pictures or Videos (Drag and drop or Click)")}
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="form-control"
                        id="inputFiles"
                        multiple
                      />
                    </div>
                    <div
                      className={styles.dragArea}
                      onDragEnter={(e) => e.preventDefault()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDropFile}
                    >
                      <p
                        className="text-center"
                        style={{ userSelect: "none", margin: "0" }}
                      >
                        {t("Drag and drop files here")}
                      </p>
                    </div>

                    <div className="mt-2">
                      <p>
                        {t("Total files:")} {files.length}
                      </p>
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-2"
                        >
                          <span>{file.name}</span>
                          <button
                            variant="danger"
                            size="sm"
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveFile(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        style={{ cursor: "pointer" }}
                        id="postAnonymous"
                        name="postAnonymous"
                        checked={postAnonymous}
                        onChange={() => setPostAnonymous(!postAnonymous)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="postAnonymous"
                      >
                        {t("Anonymous")}
                      </label>
                    </div>
                    <button type="submit" className={`btn ${styles.submitBtn}`}>
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        t("Post")
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* input box for posting */}
        <div className={styles.bg}>
          <div className={styles.postsContainer}>
            {loading
              ? Array.from({ length: 15 }).map((_, i) => (
                  <div className={styles.borderClass} key={`Skeletons${i}`}>
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
                )) //skeletons for loading
              : posts.map((post, postIndex) => (
                  <div className={styles.postsG} key={post._id} id={post._id}>
                    <Link
                      href={`/posts/${post._id}`}
                      target="_blank"
                      className={styles.ptitle}
                    >
                      {post.title}
                    </Link>
                    <br className={styles.g} />
                    <div
                      className={styles.contents}
                      style={{
                        cursor:
                          isExpanded.includes(post._id) ||
                          post.content.length <= 103
                            ? "inherit"
                            : "pointer",
                      }}
                      onClick={() => toggleExpand(post._id)}
                    >
                      {displayContent(post.content, post._id)}
                    </div>
                    <br className={styles.g} />
                    <br className={styles.g} />
                    <div className={styles.imgs}>
                      {post.pictureUrl.length > 1 &&
                        post.pictureUrl.map((image, index) => (
                          <section key={"multi" + image.filename}>
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                              onClick={() =>
                                imagePreview(index, postIndex, image)
                              }
                            >
                              <img
                                src={`/uploads/${image.filename}`}
                                alt={image.filename}
                                width="300"
                                height="300"
                                className={styles.Images}
                              />
                            </button>
                            {check[index] && imgCheck[postIndex] && (
                              <img
                                src={`/uploads/${image.filename}`}
                                alt={image.filename}
                                id={`${post._id}-${index}`}
                                width={300 * scale}
                                height={300 * scale}
                                className={styles.above}
                                onWheel={handleWheel}
                              />
                            )}
                            {check[index] && imgCheck[postIndex] && (
                              <button
                                className={`${styles.closePreview} btn-close`}
                                onClick={() =>
                                  handleCheckClose(index, postIndex)
                                }
                                style={{
                                  border: "none",
                                  backgroundColor: "transparent",
                                }}
                              >
                              </button>
                            )}
                            {backCheck && <div className={styles.blocks} />}
                          </section>
                        ))}
                      {post.pictureUrl.length === 1 &&
                        post.pictureUrl.map((image, index) => (
                          <section key={"1pic" + image.filename}>
                            <button
                              onClick={() => imagePreview1(postIndex, image)}
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                            >
                              <img
                                src={`/uploads/${image.filename}`}
                                alt={image.filename}
                                width="300"
                                height="300"
                                className={styles.Image}
                              />
                            </button>
                            {ok && imgCheck[postIndex] && (
                              <img
                                src={`/uploads/${image.filename}`}
                                alt={image.filename}
                                width={300 * scale}
                                height={300 * scale}
                                className={styles.above}
                                onWheel={handleWheel}
                              />
                            )}

                            {ok && imgCheck[postIndex] && (
                              <button
                              className={`${styles.closePreview} btn-close`}
                                onClick={() => handleClose(postIndex)}
                                style={{
                                  border: "none",
                                  backgroundColor: "transparent",
                                }}
                              >
                              </button>
                            )}

                            {ok && imgCheck[postIndex] && (
                              <div className={styles.blocks} />
                            )}
                          </section>
                        ))}
                    </div>
                    <br className={styles.g} />
                    <br className={styles.g} />
                    {post.postAnonymous !== "true" && (
                      <Link
                        className={styles.author}
                        href={`/profile/${post.username}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {loadedSrc[post._id] ? (
                          <img
                            src={loadedSrc[post._id]}
                            className={styles.avatarGeneral}
                          />
                        ) : (
                          <img
                            priority="true"
                            src="./preview.svg"
                            className={styles.avatarGeneral}
                            alt="avatar"
                            width={35}
                            height={35}
                          />
                        )}
                        {"\u00A0\u00A0"}
                        {post.username}
                      </Link>
                    )}
                    <br className={styles.g} />
                    <p className={styles.postT}>
                      {t("posted on")} {post.postingtime}
                    </p>
                    <br className={styles.g} />
                    <div className={styles.likeContainer}>
                      {(() => {
                        let like = likes.find(
                          (like) => like.postId === post._id,
                        );
                        if (like) {
                          return (
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
                              type="all"
                            />
                          );
                        }
                      })()}
                    </div>

                    {/* Comment Open Button */}
                    <button
                      onClick={() => handleComment(post._id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
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
                      <GetCommentNum postId={post._id} />{" "}
                    </button>

                    {/* Comment List */}
                    {commentOpen.includes(post._id) && (
                      <>
                        <CommentUpload
                          fetchLikes={fetchLikes}
                          username={username}
                          postId={post._id}
                          setCommentUploadRefresh={setCommentUploadRefresh}
                          commentUploadRefresh={commentUploadRefresh}
                          commentOpen={commentOpen}
                          getComments={getComments}
                        />
                        <br className={styles.g} />
                        {commentOpen.includes(post._id) && (
                          <div className={styles.commentSection}>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  position: "relative",
                                  margin: "0",
                                }}
                              >
                                {comments &&
                                comments.filter(
                                  (comment) => comment.postId === post._id,
                                ).length > 0
                                  ? `${comments.filter((comment) => comment.postId === post._id).length} ${comments.filter((comment) => comment.postId === post._id).length === 1 ? t("Comment") : t("Comments")}`
                                  : t("No Comments")}
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
                                .filter(
                                  (comment) => comment.postId === post._id,
                                )
                                .map((com, index) => (
                                  <>
                                    <div
                                      key={com._id}
                                      style={{ padding: "8px" }}
                                    >
                                      <div style={{ display: "flex" }}>
                                        <h2
                                          className="fs-5"
                                          style={{ fontWeight: "700" }}
                                        >
                                          {com.username}
                                        </h2>
                                        {/* {admin && (
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
                                              className={styles.deleteBtn}
                                              style={{
                                                position: "absolute",
                                                right: "2.5vw",
                                                scale: "0.8",
                                              }}
                                            >
                                              <span>{t("Admin Delete")}</span>
                                            </button>
                                          </form>
                                        )} */}
                                        {com.username === username && (
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
                                              className={styles.deleteBtn}
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
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <h2
                                          className="fs-6"
                                          style={{
                                            alignSelf: "center",
                                            display: "flex",
                                          }}
                                        >
                                          {com.postingtime}
                                        </h2>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            position: "relative",
                                          }}
                                        >
                                          <button
                                            onClick={() =>
                                              handleSubComment(com._id)
                                            }
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              position: "relative",
                                              border: "none",
                                              backgroundColor: "transparent",
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
                                                margin: "0",
                                                alignSelf: "center",
                                              }}
                                            >
                                              {t("Reply")}
                                            </p>
                                          </button>
                                          <div
                                            style={{
                                              position: "relative",
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
                                                setLikestatuses={
                                                  setLikestatuses
                                                }
                                                setLikes={setLikes}
                                                size={30}
                                                type="all"
                                              />
                                            ))}
                                          </div>
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
                <div className={styles.borderClass} key={i}>
                  <React.Fragment>
                    <Skeleton classes="title width-40" />
                    <Skeleton classes="text width-70" />
                    <Skeleton classes="text width-70" />
                    <Skeleton classes="text width-70" />
                    <br className={styles.g} />
                    <Skeleton classes="text width-pic" />
                    <br className={styles.g} />
                    <Skeleton classes="text width-user" />
                    <br className={styles.g} />
                    <Skeleton classes="text width-40" />
                    <Skeleton classes="text width-delete" />
                    <br className={styles.g} />
                  </React.Fragment>
                </div>
              )) */}
                    <br className={styles.g} />
                    {post.username === username && (
                      <div className={styles.deleteForm}>
                        <form onSubmit={handleDelete}>
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={post._id}
                          />
                          <button type="submit" className={styles.deleteBtn}>
                            <span>{t("Delete")}</span>
                          </button>
                        </form>
                      </div>
                    )}
                    {/* {admin && (
                      <div className={styles.deleteForm}>
                        <form onSubmit={handleDelete}>
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={post._id}
                          />
                          <button type="submit" className={styles.deleteBtn}>
                            <span>{t("Admin Delete")}</span>
                          </button>
                        </form>
                      </div>
                    )} */}
                  </div>
                ))}{" "}
            {bottomLoad && (
              <div className={styles.borderClass}>
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
            )}
            {noMore && (
              <div style={{ marginLeft: "3rem", marginTop: "2rem" }}>
                {t("No more posts~")}
              </div>
            )}
            {/* posts mapping */}
          </div>
        </div>
        <div className={styles.spacing} />
      </div>
    </section>
  );
}

export default Generalform;
