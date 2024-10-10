"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "../../app/src/dashboard.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const DashScroll = ({ posts, likes, ind, info }) => {
  const leftover = posts.length % 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lshow, setLshow] = useState(false);
  const [rshow, setRshow] = useState(false);
  const { t } = useTranslation();
  const mapping = {
    post: 1,
    likep: 2,
    comment: 3,
    like: 4,
  };
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
  useEffect(() => {
    if (ind)
      document.documentElement.style.setProperty("--dash-width", "14.6vw");
    else document.documentElement.style.setProperty("--dash-width", "17vw");
  }, [ind]);
  return (
    <div className={styles.posts}>
      <h2 className={styles.dashh2}>
        {mapping[`${info}`] === 1
          ? t("My Posts")
          : mapping[`${info}`] === 2
            ? t("Liked Posts")
            : mapping[`${info}`] === 3
              ? t("My Comments")
              : mapping[`${info}`] === 4
                ? t("Liked Comments")
                : ""}
      </h2>
      <br />
      <div className={styles.dashpost}>
        {posts.length > 0 && lshow && (
          <button className={styles.postBtns} onClick={() => goBack()}>
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
        {posts.length > 0 && !lshow && <div className={styles.postBtns} />}
        {(posts.length === 0 || posts.length === undefined) && (
          <p className={styles.dashp} style={{ margin: "2vh 2vh" }}>
            {mapping[`${info}`] === 1
              ? t("You have no posts yet")
              : mapping[`${info}`] === 2
                ? t("You have no liked posts yet")
                : mapping[`${info}`] === 3
                  ? t("You have no comments yet")
                  : mapping[`${info}`] === 4
                    ? t("You have no liked comments yet")
                    : ""}
          </p>
        )}
        <TransitionGroup className={styles.myPosts}>
          {posts.length > 0 &&
            likes.length > 0 &&
            posts.slice(currentIndex, currentIndex + 5).map((post) => (
              <CSSTransition
                key={post._id}
                timeout={500}
                classNames={{
                  enter: styles.itemEnter,
                  enterActive: styles.itemEnterActive,
                  exit: styles.itemExit,
                  exitActive: styles.itemExitActive,
                }}
                style={{ display: "flex", alignItems: "stretch" }}
              >
                <Link
                  href={`/posts/${post?._id}`}
                  target="_blank"
                  className={styles.scrollLink}
                >
                  <div className={styles.boxBig} style={{ display: "flex" }}>
                    <div className={`${styles.myPost} ${styles.dashBox}`}>
                      <div className={styles.dashBox1} />
                      <p
                        className={styles.dashTitle}
                        style={{ fontSize: "1.2rem", fontWeight: "600" }}
                      >
                        {post.title}
                      </p>
                      <p style={{ fontSize: "0.9rem", fontWeight: "300" }}>
                        {post.username}
                      </p>
                      <p style={{ fontSize: "0.9rem", fontWeight: "300" }}>
                        {t("Likes: ")}
                        {likes.find((like) => like?.postId === post._id)
                          ?.number || 0}
                      </p>
                      <p style={{ fontSize: "0.9rem", fontWeight: "300" }}>
                        {post.postingtime}
                      </p>
                    </div>
                  </div>
                </Link>
              </CSSTransition>
            ))}
        </TransitionGroup>
        {posts.length > 0 && !rshow && <div className={styles.postBtns} />}
        {posts.length > 0 && rshow && (
          <button className={styles.postBtns} onClick={() => goNext()}>
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
      <br />
    </div>
  );
};

export default DashScroll;
