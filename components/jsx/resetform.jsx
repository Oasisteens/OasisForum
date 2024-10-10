"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "../../app/src/resetform.module.css";

const Resetform = ({ id }) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [tip, setTip] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("/api/verifyToken", {
          params: {
            resetToken: id,
          },
        });
        setUsername(response.data.username);
        setShow(true);
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 404) {
          router.push("/dashboard");
          return;
        }
      }
    };

    verifyToken();
  }, []);

  const handleCaptchaChange = (value) => {
    // Handle captcha value change
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setTip(t("Passwords do not match"));
      setLoading(false);
      return;
    }
    if (inputUser !== username) {
      setTip(t("Username does not match"));
      setLoading(false);
      return;
    }
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
        return;
      }
    }
    try {
      const res = await axios.patch("/api/resetPassword", {
        username: username,
        password: password,
      });
      if (res.data.message === "Password updated") {
        alert("Password updated. Please login with your new password.");
        router.push("/login");
      }
    } catch (error) {}
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
    if (password === "") {
      setTip(t("Password cannot be empty"));
    } else if (e.target.value !== password) {
      setTip(t("Passwords do not match"));
    } else if (e.target.value === password) {
      setTip("");
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    if (e.target.value !== confirmPassword) {
      setTip(t("Passwords do not match"));
    } else if (e.target.value === confirmPassword) {
      setTip("");
    }
  };

  return show ? (
    <main className={styles.resetPs}>
      <div>
        <form className={styles.resetPsForm} onSubmit={handleSubmit}>
          <h1 className={styles.resetTitle}>
            {t("Hi") + " " + username + t("!")}
          </h1>
          <h2>{t("Please enter your new password")}</h2>
          <br />
          <br />
          <input
            type="text"
            value={inputUser}
            autoComplete="true"
            onChange={(e) => setInputUser(e.target.value)}
            placeholder={t("Username")}
            className={styles.psReset}
            required
          />
          <br />
          <input
            type="password"
            value={password}
            autoComplete="new-password"
            onChange={handlePassword}
            placeholder={t("New Password")}
            className={styles.psReset}
            required
          />
          <br />
          <input
            type="password"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={handleConfirm}
            placeholder={t("Confirm Password")}
            className={styles.psReset}
            required
          />
          <br />
          <ReCAPTCHA
            className={styles.recaptcha}
            size="normal"
            sitekey="6LeGyr4pAAAAALQNLTIknyzYqBi_D3Juk9LnsROZ"
            onChange={handleCaptchaChange}
          />
          <br />
          {tip !== "" && <p className={styles.tip}>{tip}</p>}
          <button
            className={styles.resetpsBtn}
            type="submit"
            disabled={captchaValue === ""}
          >
            {loading ? (
              <div className={styles.dots - container}>
                <div className={styles.dots}></div>
                <div className={styles.dots}></div>
                <div className={styles.dots}></div>
                <div className={styles.dots}></div>
                <div className={styles.dots}></div>
              </div>
            ) : (
              t("Reset Password")
            )}
          </button>
        </form>
      </div>
    </main>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.loader} />
    </div>
  );
};

export default Resetform;
