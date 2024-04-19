"use client";
import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

const ThroughEmail = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = i18n.language.substring(0, 2);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [final, setFinal] = useState(false);
  const [to, setTo] = useState("");
  const [sendMailDisabled, setSendMailDisabled] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");

  const sendMail = async (email, lang, username) => {
    try {
      const response = await axios.post("/api/send", {
        to: email,
        lang,
        username,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCaptchaChange = (value) => {
    // Handle captcha value change
    setCaptchaValue(value);
  };

  const verifyEmail = async (e) => {
    e.preventDefault();
    IncWidth();
    try {
      const res = await axios.post("/api/validateCaptcha", {
        response_key: captchaValue,
      });
      if (res.data.success === false) {
        alert(t("Please click <I'm not a robot> before sending the form"));
        return;
      }
    } catch (err) {
      if (err.response.status === 500) {
        alert(t("An error occurred. Please try again later."));
      }
      console.log(err);
    }
    try {
      const res = await axios.get("/api/verifyEmail", {
        params: {
          email: email,
        },
      });
      if (res.data.message === "User found") {
        const form = document.getElementById("emailForm");
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.alignItems = "center";
        form.style.justifyContent = "center";
        form.style.transition = "all 0.7s";
        form.style.width = "40vw";
        form.style.height = "38rem";
        setTo(res.data.user.email);
        setFinal(true);
        sendMail(email, language, res.data.user.username);
        setTimeout(() => {
          form.style.transition = "none";
        }, 1000);
        setSendMailDisabled(true);
        setTimeout(() => {
          setSendMailDisabled(false);
        }, 60 * 1000);
      }
      DecWidth();
    } catch (err) {
      if (err.response.status === 404) {
        alert(
          t(
            "Your email is not registered with us. Please try again or sign up.",
          ),
        );
        DecWidth();
      }
    }
  };

  const IncWidth = () => {
    const element = document.getElementById("searchEmail");
    element.style.width = "20vw";
    setLoading(true);
  };

  const DecWidth = () => {
    const element = document.getElementById("searchEmail");
    element.style.width = "6rem";
    setLoading(false);
  };

  return (
    <div className="emailForm" id="emailForm">
      {final ? (
        <div className="final">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={210}
            height={210}
            viewBox="0 0 512 512"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="26"
              className="path1"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="26"
              d="M352 176L217.6 336 160 272"
              className="path1"
            />
          </svg>
          <br />
          <br />
          <div
            style={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: "3px",
            }}
          >
            <h1>
              {t("A verification email has been sent to your email address: ")}
            </h1>
            <h1>{to}</h1>
            <h1>{t("Please check your inbox (including the junk mails).")}</h1>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflowWrap: "break-word",
            }}
          >
            <Image src="/favicon.png" width={60} height={60} alt="Oasis" />
            <br />
            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: "500",
                overflowWrap: "break-word",
              }}
            >
              {t("Search your email address")}
            </h1>
            <br />
            <h2 style={{ fontSize: "1rem", fontWeight: "400" }}>
              {t("Please enter your email")}
            </h2>
          </div>
          <form className="emailForm" onSubmit={verifyEmail}>
            <input
              type="email"
              value={email}
              className="emailInput"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("Email address")}
            />
            <ReCAPTCHA
              className="recaptcha"
              size="normal"
              sitekey="6LeGyr4pAAAAALQNLTIknyzYqBi_D3Juk9LnsROZ"
              onChange={handleCaptchaChange}
            />
            <button
              id="searchEmail"
              className="searchEmail"
              type="submit"
              disabled={sendMailDisabled || captchaValue === ""}
            >
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div className="stick" />
                  ))}
                  {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                  <p className="loading">{t("LOADING...")}</p>
                </div>
              ) : (
                t("Next")
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ThroughEmail;
