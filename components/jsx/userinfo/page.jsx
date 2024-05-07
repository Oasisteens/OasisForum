"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../app/i18n.js";
import Avatar from "../avatar.jsx";
import { useTranslation } from "react-i18next";
import "../../../app/src/userinfo.css";

const UserInfo = ({ username, image, updateSession, auth }) => {
  const handleSignOut = () => {
    signOut();
    redirect("/");
  };
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
  // Pull info(language) from localStorage

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", navigator.language.substring(0, 2));
    }
    const selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]); //localStorage get language setting

  useEffect(() => {
    if (!localStorage.getItem("dashColor")) {
      localStorage.setItem("dashColor", "blue");
    }
    const selectedColor = localStorage.getItem("dashColor");
    if (selectedColor) {
      document.documentElement.style.setProperty(
        "--main-color",
        `var(--${selectedColor})`,
      );
      document.documentElement.style.setProperty(
        "--sub-color",
        `var(--${selectedColor}-lighter)`,
      );
      document.documentElement.style.setProperty(
        "--third-color",
        `var(--${selectedColor}-lightest)`,
      );
    }
  }, []); //localStorage get color setting

  return (
    <main className="background" id="userBg">
      <Avatar
        username={username}
        avatar={image}
        updateSession={updateSession}
        auth={auth}
      />
      <div className="card">
        <br />
        <div>
          <p className="card-text">
            {t("Username: ")}
            <span className="blue-text">{username}</span>
          </p>
          <a href="/dashboard" className="redi">
            {t("Back to Dashboard")}
          </a>
        </div>

        {auth && (
          <button onClick={handleSignOut} className="logout-btn">
            {t("Log Out")}
          </button>
        )}
      </div>
    </main>
  );
};

export default UserInfo;
