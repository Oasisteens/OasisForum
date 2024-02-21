"use client";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import Nav from "@/app/(components)/Nav";
import { useState } from "react";
import axios from "axios";
import "@/app/i18n";
import { useTranslation } from "react-i18next";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../../app/src/dashboard.css";

export default function Dashboardform({ username }) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeIndex, setLikeIndex] = useState(0);
  const [likelshow, setLikelshow] = useState(false);
  const [likershow, setLikershow] = useState(false);
  const [lshow, setLshow] = useState(false);
  const [rshow, setRshow] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [color, setColor] = useState("blue");

  // Custom Color hasn't finished

  // const changeCustomColor = (event) => {
  //   const value = event.target.customColor.value;
  //   setColor(value);
  //   document.documentElement.style.setProperty("--main-color", value);
  //   localStorage.setItem("dashColor", value);
  //   setShowColorPicker(false);
  // }

  // i18n setting
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = i18n.language.substring(0, 2); // get language from i18n
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

  useEffect(() => {
    if (!localStorage.getItem("dashColor")) {
      localStorage.setItem("dashColor", "blue");
    }
    const selectedColor = localStorage.getItem("dashColor");
    if (selectedColor) {
      document.documentElement.style.setProperty(
        "--dash-color",
        `var(--${selectedColor})`,
      );
      setColor(selectedColor);
    }
  }, []);

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    // save user option in localStorage
    localStorage.setItem("language", selectedLanguage);
  };

  const changeColor = (event) => {
    const selectedColor = event.target.value;
    if (selectedColor) {
      setColor(selectedColor);
      document.documentElement.style.setProperty(
        "--dash-color",
        `var(--${selectedColor})`,
      );
      localStorage.setItem("dashColor", selectedColor);
    }
  };

  const leftover = posts.length % 5;

  const getPosts = async () => {
    try {
      const res = await axios.post("/api/getUserPosts", {
        username: username,
      });
      setPosts(res.data.posts);
      setLikes(res.data.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const goNext = (index) => {
    if (index === "currentIndex") {
      if (currentIndex + 9 < posts.length) {
        setCurrentIndex(currentIndex + 5);
      } else if (currentIndex + leftover + 4 < posts.length) {
        setCurrentIndex(currentIndex + leftover);
      }
    } else if (index === "likeIndex") {
      if (likeIndex + 9 < posts.length) {
        setLikeIndex(likeIndex + 5);
      } else if (likeIndex + leftover + 4 < posts.length) {
        setLikeIndex(likeIndex + leftover);
      }
    }
  };

  const goBack = (index) => {
    if (index === "currentIndex") {
      if (currentIndex - 5 >= 0) {
        setCurrentIndex(currentIndex - 5);
      } else if (currentIndex - leftover >= 0) {
        setCurrentIndex(currentIndex - leftover);
      }
    } else if (index === "likeIndex") {
      if (likeIndex - 5 >= 0) {
        setLikeIndex(likeIndex - 5);
      } else if (likeIndex - leftover >= 0) {
        setLikeIndex(likeIndex - leftover);
      }
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
  }, [likeIndex, posts]);

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
    getPosts();
  }, []);

  const handleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <main className="dash">
      <title>
        {username ? `${username}${t("'s Dashboard")}` : t("Dashboard")}
      </title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="dash">
        <Link href="intro" className="toIntro">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            width={50}
            height={50}
            viewBox="0 0 512 512"
          >
            <path
              d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z"
              fill="none"
              stroke="wheat"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              d="M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11"
              fill="none"
              stroke="wheat"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
          </svg>
          <span className="intro">{t("Oasis")}</span>
        </Link>
        <button className="menuBtn" onClick={handleNav}>
          <svg
            fill="none"
            width="100%"
            height="100%"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
            />
          </svg>
        </button>
        <h1 className="dashh1">
          {username ? `${username}${t("'s Dashboard")}` : t("Dashboard")}
        </h1>
        <div className="language-selector">
          <select
            id="lang"
            name="lang"
            onChange={changeLanguage}
            value={language}
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        <div className="color-selector">
          <select id="color" name="color" onChange={changeColor} value={color}>
            <option value="pink">{t("Pink")}</option>
            <option value="blue">{t("Blue")}</option>
            <option value="purple">{t("Purple")}</option>
            <option value="red">{t("Red")}</option>
            {/* <option value="custom">{t('Custom')}</option> */}
          </select>
          {/* Custom Color hasn't finished */}
          {/* {showColorPicker && (
            <form onSubmit={changeCustomColor}>
              <input type="color" name="customColor" id="customColor" value={color} />
              <button type="submit">{t('Choose')}</button>
            </form>
      )} */}
        </div>
      </div>
      {navVisible && (
        <div className="nav">
          <Nav />
        </div>
      )}
      <section className="secd">
        <div className="comments">
          <h2 className="dashh2">{t("My Comments")}</h2>
          <br />
          <div className="dashcomment">
            <p className="dashp">{t("You have no comments yet")}</p>
          </div>
        </div>
        <div className="posts">
          <h2 className="dashh2">{t("My Posts")}</h2>
          <br />
          <div className="dashpost">
            {posts.length > 0 && lshow && (
              <button className="postBtns" onClick={goBack}>
                <Image
                  src="/backBtn.svg"
                  className="postsvgs"
                  layout="fill"
                  objectFit="contain"
                  alt="goBack"
                />
              </button>
            )}
            {posts.length > 0 && !lshow && <div className="postBtns" />}
            {(posts.length === 0 || posts.length === undefined) && (
              <p className="dashp">{t("You have no posts yet")}</p>
            )}
            <TransitionGroup className="myPosts">
              {posts.length > 0 &&
                posts
                  .slice(currentIndex, currentIndex + 5)
                  .map((post, index) => (
                    <CSSTransition key={index} timeout={500} classNames="item">
                      <div className="myPost">
                        <p>{post.title}</p>
                        <p>{post.username}</p>
                        <p>Likes: {likes[index].number}</p>
                      </div>
                    </CSSTransition>
                  ))}
            </TransitionGroup>
            {posts.length > 0 && !rshow && <div className="postBtns" />}
            {posts.length > 0 && rshow && (
              <button className="postBtns" onClick={goNext}>
                <Image
                  src="/nextBtn.svg"
                  className="postsvgs"
                  layout="fill"
                  objectFit="contain"
                  alt="goNext"
                />
              </button>
            )}
          </div>
        </div>
        <div className="likes">
          <h2 className="dashh2">{t("Liked Posts")}</h2>
          <br />
          <div className="dashpost">
            {posts.length > 0 && lshow && (
              <button className="postBtns" onClick={goBack}>
                <Image
                  src="/backBtn.svg"
                  className="postsvgs"
                  layout="fill"
                  objectFit="contain"
                  alt="goBack"
                />
              </button>
            )}
            {posts.length > 0 && !lshow && (
              <div className="postBtns" width="40" height="40" />
            )}
            {(posts.length === 0 || posts.length === undefined) && (
              <p className="dashp">{t("You have no liked posts yet")}</p>
            )}
            <TransitionGroup className="myPosts">
              {posts.length > 0 &&
                posts
                  .slice(currentIndex, currentIndex + 5)
                  .map((post, index) => (
                    <CSSTransition key={index} timeout={500} classNames="item">
                      <div className="myPost">
                        <p>{post.title}</p>
                        <p>{post.username}</p>
                        <p>Likes: {likes[index].number}</p>
                      </div>
                    </CSSTransition>
                  ))}
            </TransitionGroup>
            {posts.length > 0 && !rshow && (
              <div className="postBtns" width="40" height="40" />
            )}
            {posts.length > 0 && rshow && (
              <button className="postBtns" onClick={goNext}>
                <Image
                  src="/nextBtn.svg"
                  className="postsvgs"
                  layout="fill"
                  objectFit="contain"
                  alt="goNext"
                />
              </button>
            )}
          </div>
        </div>
        <div className="like">
          <h2 className="dashh2">{t("Liked Comments")}</h2>
          <br />
          <div className="dashlike">
            <p className="dashp">{t("You have no liked comments yet")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
