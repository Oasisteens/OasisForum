"use client";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import "../../app/src/confession.scss";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import loveWords from "../../app/src/loveWords.json";

export default function Confessionform({ username }) {
  const [toWho, setToWho] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [hidden, setHidden] = useState(true);
  const [loveforms, setLoveforms] = useState([]);
  const [cn, setCn] = useState("");
  const [loading, setLoading] = useState(false);
  const [en, setEn] = useState("");

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

  useEffect(() => {
    const loveWordsArray = Object.values(loveWords);
    const randomIndex = Math.floor(Math.random() * loveWordsArray.length);
    setCn(loveWordsArray[randomIndex].CN);
    setEn(loveWordsArray[randomIndex].EN);
  }, []);

  const getLove = async () => {
    try {
      const response = await axios.get("/api/fetchLove");
      setLoveforms(response.data.loveforms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLove();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/fetchLove", {
        username,
        toWho,
        nickname,
        content,
      });
      setLoading(false);
      closeForm();
      getLove();
    } catch (error) {
      console.log(error);
    }
  };

  const openForm = () => {
    setHidden(!hidden);
  };
  const closeForm = () => {
    setHidden(true);
    setToWho("");
    setNickname("");
    setContent("");
  };

  return (
    <body className="loveBg">
      <div className="pyro">
        <div className="before" />
        <div className="after" />
        <button className="openFormBtn" onClick={() => openForm()}>
          {t("Express your love")}
        </button>
        {hidden ? (
          false
        ) : (
          <div className="formContainer">
            <form
              className="loveForm"
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
            >
              <textarea
                type="text"
                className="IPT"
                name="toWho"
                required
                placeholder={t("To who?")}
                onInput={(e) => {
                  const value = e.target.value;
                  setToWho(value); // Update title state
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onFocus={(e) => {
                  e.target.style.color = "black";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onBlur={(e) => {
                  e.target.style.color = "gray";
                }}
                value={toWho}
              />
              <textarea
                type="text"
                className="IPT"
                name="nickname"
                placeholder={t("Your nickname? (optional)")}
                onInput={(e) => {
                  const value = e.target.value;
                  setNickname(value); // Update title state
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onFocus={(e) => {
                  e.target.style.color = "black";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onBlur={(e) => {
                  e.target.style.color = "gray";
                }}
                value={nickname}
              />
              <textarea
                required
                name="content"
                className="IPT"
                placeholder={t("Your confession?")}
                rows={1}
                onInput={(e) => {
                  const value = e.target.value;
                  setContent(value); // Update title state
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onFocus={(e) => {
                  e.target.style.color = "black";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onBlur={(e) => {
                  e.target.style.color = "gray";
                }}
                value={content}
              />
              <button
                type="submit"
                className={`confessionBtn ${!loading && "add"}`}
                disabled={loading}
              >
                {!loading && <p style={{ textAlign: "center" }}>{t("Post")}</p>}
                {loading && t("Loading...")}
              </button>
            </form>
          </div>
        )}
        <div className="loveBody">
          {loveforms.map((loveform, index) => (
            <div className="loveOne" key={index}>
              <div className="Towho">To: {loveform.toWho}</div>
              <div className="lvContent">{loveform.content}</div>
              {loveform.nickname && (
                <div className="lvNickname">
                  {t("from: ")}
                  {loveform.nickname}
                </div>
              )}
            </div>
          ))}
        </div>
        <footer className="loveSentence">
          {cn}
          <br />
          {en}
        </footer>
      </div>
    </body>
  );
}
