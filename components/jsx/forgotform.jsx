"use client";
import React from "react";
import { useEffect, useState } from "react";
import "../../app/i18n.js";
import ThroughEmail from "./throughEmail.jsx";
import ThroughUsername from "./throughUsername.jsx";
import { useTranslation } from "react-i18next";
import styles from "../../app/src/reset.module.scss";
import { set } from "lodash";

const Forgotform = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [emailForm, setEmailForm] = useState(false);
  const [usernameForm, setUsernameForm] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", navigator.language.substring(0, 2));
    }
    const selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]); //localstorage get language

  useEffect(() => {
    if (usernameForm && emailForm) {
      setEmailForm(false);
      setUsernameForm(false);
    }
  }, [usernameForm, emailForm]);

  return (
    <main className={styles.reset}>
      {!emailForm && !usernameForm && (
        <div className={styles.resetForm}>
          <h1 style={{ fontWeight: "500", fontSize: "2.2rem" }}>
            {t("Recover your account")}
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="recoverBtn recover1"
              type="button"
              onClick={() => setEmailForm(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={150}
                height={150}
                viewBox="0 0 512 512"
              >
                <rect
                  x="48"
                  y="96"
                  width="416"
                  height="320"
                  rx="40"
                  ry="40"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  className={styles.path}
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M112 160l144 112 144-112"
                  className={styles.path}
                />
              </svg>
              <h2 style={{ fontWeight: "400" }}>{t("through your email")}</h2>
            </button>
            <button
              className="recoverBtn recover2"
              type="button"
              onClick={() => setUsernameForm(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 512 512"
                width={150}
                height={150}
                className={styles.animated - fill}
              >
                <path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z" />
                <path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z" />
              </svg>
              <h2 style={{ fontWeight: "400" }}>
                {t("through your username")}
              </h2>
            </button>
          </div>
        </div>
      )}

      {emailForm && !usernameForm && <ThroughEmail />}

      {usernameForm && !emailForm && <ThroughUsername />}
    </main>
  );
};

export default Forgotform;

{
  /* <div style={{flexDirection: "column"}}>
            <h1 style={{fontWeight: "500", fontSize: "2rem"}}>{t("Search your email/account")}</h1>
          <h2 style={{fontWeight: "300", fontSize: "1.1rem"}}>{t("Enter your email address or username")}</h2>
          </div>
          
          <form style={{ display: "flex" }}>
            <input type="email" placeholder="Email" />
            <button type="submit">Reset</button>
          </form> */
}
