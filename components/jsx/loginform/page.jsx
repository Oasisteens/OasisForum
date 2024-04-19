"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { TailSpin } from "react-loader-spinner";
import "../../../app/i18n";
import { useTranslation } from "react-i18next";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import "../../../app/src/login.css";
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
      <body className="loginbd">
        <div className="box1" />
        <div className="box2" />
        <div className="box3" />
        <div className="box4" />
        <div className="box5" />
        <div className="box6" />
        <div className="box7" />
        <div className="box8" />
        <div className="box9" />
        <div className="box10" />
        <div className="box11" />
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit} id="loginForm">
              <h2 className="LogTitle">{t("Login")}</h2>
              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input
                  type="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={load}
                />
                <label htmlFor="username">{t("Username")}:</label>
              </div>
              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={load}
                />
                <label htmlFor="password">{t("Password")}:</label>
              </div>
              <button type="submit" className="reg1" disabled={loading && load}>
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
                {load && <span className="lddd">{t("Loading")}...</span>}
                {!loading && !load && t("Login")}
              </button>
              <div className="login">
                {errorMessage && <div className="logerror">{errorMessage}</div>}
                {!errorMessage && (
                  <p>
                    {t("Do not have an account?")}{" "}
                    <Link
                      style={{ fontWeight: "700" }}
                      className="regww"
                      href="/register"
                    >
                      {t("Register")}
                    </Link>
                  </p>
                )}
                <br />
                <Link href="/forgotpassword" className="forgetPs">
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
