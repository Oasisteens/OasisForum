"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { TailSpin } from "react-loader-spinner";
import "../../../app/i18n";
import { useTranslation } from "react-i18next";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import styles from "../../../app/src/login.module.css";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
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
    window.onload = function () {};
    setLoad(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res.error) {
        setErrorMessage(t("Invalid username or password"));
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        router.replace("dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>{t("Login")}</title>
      <body className={styles.loginbd}>
        <div className={styles.box1} />
        <div className={styles.box2} />
        <div className={styles.box3} />
        <div className={styles.box4} />
        <div className={styles.box5} />
        <div className={styles.box6} />
        <div className={styles.box7} />
        <div className={styles.box8} />
        <div className={styles.box9} />
        <div className={styles.box10} />
        <div className={styles.box11} />
        <div className={styles.formBox}>
          <div>
            <form onSubmit={handleSubmit} id="loginForm">
              <h2 className={styles.LogTitle}>{t("Login")}</h2>
              <div className={styles.inputbox}>
                <IonIcon icon={mailOutline} />
                <input
                  type="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={load}
                  pattern="^[^\W_]+$"
                  maxLength={20}
                />
                <label htmlFor="username">{t("Username")}:</label>
              </div>
              <div className={styles.inputbox}>
                <IonIcon icon={lockClosedOutline} />
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={load}
                />
                <label htmlFor="password">{t("Password")}:</label>
              </div>
              <button
                type="submit"
                className={styles.reg1}
                disabled={loading && load}
              >
                {loading && (
                  <>
                    <TailSpin
                      type="ThreeDots"
                      color="black"
                      height={20}
                      width={40}
                      style={{ marginRight: "5px" }}
                    />
                    <span>{t("Loading")}...</span>
                  </>
                )}
                {load && <span className={styles.lddd}>{t("Loading")}...</span>}
                {!loading && !load && t("Login")}
              </button>
              <div className={styles.login}>
                {errorMessage && (
                  <div className={styles.logerror}>{errorMessage}</div>
                )}
                {!errorMessage && (
                  <p>
                    {t("Do not have an account?")}{" "}
                    <Link
                      style={{ fontWeight: "700" }}
                      className={styles.regww}
                      href="/register"
                    >
                      {t("Register")}
                    </Link>
                  </p>
                )}
                <br />
                <Link href="/forgotpassword" className={styles.forgetPs}>
                  {t("Forgot Password?")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};

export default LoginForm;
