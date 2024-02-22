"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const DashScroll = ({ posts, likes }) => {
  const leftover = posts.length % 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lshow, setLshow] = useState(false);
  const [rshow, setRshow] = useState(false);
  const { t } = useTranslation();
  const goNext = () => {
    if (currentIndex + 9 < posts.length) {
      setCurrentIndex(currentIndex + 5);
    } else if (currentIndex + leftover + 4 < posts.length) {
      setCurrentIndex(currentIndex + leftover);
    }
  };

  const goBack = () => {
    if (currentIndex - 5 >= 0) {
      setCurrentIndex(currentIndex - 5);
    } else if (currentIndex - leftover >= 0) {
      setCurrentIndex(currentIndex - leftover);
    }
  };
  useEffect(() => {
    if (posts.length <= 5) {
      setLshow(false);
      setRshow(false);
    } else {
      setLshow(false);
      setRshow(true);
    }
  }, [currentIndex, posts]);

  useEffect(() => {
    if (posts.length <= 5) {
      setLshow(false);
      setRshow(false);
    } else {
      setLshow(false);
      setRshow(true);
    }
  }, [posts]);

  useEffect(() => {
    if (currentIndex + 9 < posts.length) {
      setRshow(true);
    } else if (currentIndex + leftover + 4 < posts.length && leftover !== 0) {
      setRshow(true);
    } else if (currentIndex + leftover + 4 < posts.length && leftover === 0) {
      setRshow(false);
    } else {
      setRshow(false);
    }

    if (currentIndex - 5 >= 0) {
      setLshow(true);
    } else if (currentIndex - leftover >= 0 && leftover !== 0) {
      setLshow(true);
    } else if (currentIndex - leftover === 0 && leftover === 0) {
      setLshow(false);
    } else {
      setLshow(false);
    }
  }, [currentIndex, posts, leftover]);
  return (
    <div className="posts">
      <h2 className="dashh2">{t("My Posts")}</h2>
      <br />
      <div className="dashpost">
        {posts.length > 0 && lshow && (
          <button className="postBtns" onClick={() => goBack()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M328 112L184 256l144 144"
              />
            </svg>
          </button>
        )}
        {posts.length > 0 && !lshow && <div className="postBtns" />}
        {(posts.length === 0 || posts.length === undefined) && (
          <p className="dashp">{t("You have no posts yet")}</p>
        )}
        <TransitionGroup className="myPosts">
          {posts.length > 0 &&
          likes.length > 0 &&
            posts.slice(currentIndex, currentIndex + 5).map((post) => (
              <CSSTransition key={post._id} timeout={500} classNames="item">
                <div className="myPost">
                  <p>{post.title}</p>
                  <p>{post.username}</p>
                  <p>Likes: {likes.find(like => like.postId === post._id)?.number || 0}</p>
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
        {posts.length > 0 && !rshow && <div className="postBtns" />}
        {posts.length > 0 && rshow && (
          <button className="postBtns" onClick={() => goNext()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M184 112l144 144-144 144"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default DashScroll;
