"use client";
import "../../src/post.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../i18n";
import Skeleton from "../../../components/skeletons/Skeleton.jsx";
import LikeButton from "../../../components/likeButton.jsx";
import { TailSpin } from "react-loader-spinner";
import { Picker } from "emoji-mart";
import { useTranslation } from "react-i18next";
import SubCommentUpload from "../../../components/subCommentUpload";
import ColorThief from "colorthief";
import CommentUpload from "../../../components/commentUpload";
import SubComment from "../../../components/subComment";
import Link from "next/link";

function Page({ params: { id } }) {
  const [post, setPost] = useState(null);
  const [like, setLike] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/fetchPost?id=${id}`);
      setPost(res.data.post);
      setLike(res.data.like);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div>
      {post && (
        <div className="bg">
          <div id="posts" className="word-box">
            {loading ? (
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
            ) : (
              //skeletons for loading
              <div className="postsG" key={post._id}>
                <Link href={`/posts/${post._id}`} className="ptitle">
                  {post.title}
                </Link>
                <br />
                <div className="contents">post.content</div>
                <br />
                <br />
                <div className="imgs">
                  {post.pictureUrl.length > 1 &&
                    post.pictureUrl.map((image, index) => (
                      <section key={"multi" + image.filename}>
                        <button
                          onClick={() => imagePreview(index, postIndex, image)}
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
                    />
                  }
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
                <br />
                {post.username === username && !admin && (
                  <div className="deleteForm">
                    <form onSubmit={handleSub} id="deleteForm">
                      <input type="hidden" name="id" id="id" value={post._id} />
                      <button type="submit" className="deleteBtn">
                        <span>{t("Delete")}</span>
                      </button>
                    </form>
                  </div>
                )}
                {admin && (
                  <div className="deleteForm">
                    <form onSubmit={handleSub} id="deleteForm">
                      <input type="hidden" name="id" id="id" value={post._id} />
                      <button type="submit" className="deleteBtn">
                        <span>{t("Admin Delete")}</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}{" "}
            {/* posts mapping */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
