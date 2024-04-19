"use client";
import "../../../app/src/register.css";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import "../../../app/i18n";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  mailOutline,
  lockClosedOutline,
  personCircleOutline,
} from "ionicons/icons";
import Link from "next/link";

const Registerform = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [load, setLoad] = useState(true);
  const [focus, setFocus] = useState([]);
  const { t } = useTranslation();
  const [emailFloat, setEmailFloat] = useState(false);
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
      const response = await axios.post("/api/users", {
        username: username,
        password: password,
        email: email,
      });
      router.replace("/login");
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.error);
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleFocus = (index) => {
    const newFocus = [...focus];
    newFocus[index] = true;
    setFocus(newFocus);
  };

  const handleBlur = (index) => {
    const newFocus = [...focus];
    newFocus[index] = false;
    setFocus(newFocus);
  };

  return (
    <>
      <title>{t("Register")}</title>
      <section className="Reg">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="form-boxR">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2 className="regU">{t("Register")}</h2>
              <div
                className="inputboxR"
                style={{
                  borderBottomColor: `${focus[0] ? "black" : "rgba(150, 150, 150, 0.6)"}`,
                }}
              >
                <IonIcon className="personIcon" icon={personCircleOutline} />
                <input
                  type="username"
                  onFocus={() => handleFocus(0)}
                  onBlur={() => handleBlur(0)}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  maxLength={20}
                  disabled={load}
                />
                <label htmlFor="username">{t("Username")}:</label>
              </div>
              <div
                className="inputboxR"
                style={{
                  borderBottomColor: `${focus[1] ? "black" : "rgba(150, 150, 150, 0.6)"}`,
                }}
              >
                <IonIcon icon={lockClosedOutline} />
                <input
                  type="password"
                  onFocus={() => handleFocus(1)}
                  onBlur={() => handleBlur(1)}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="on"
                  maxLength={20}
                  disabled={load}
                />
                <label htmlFor="password">{t("Password")}:</label>
              </div>
              <div
                className="inputboxR"
                style={{
                  borderBottomColor: `${focus[2] ? "black" : "rgba(150, 150, 150, 0.6)"}`,
                }}
              >
                <IonIcon icon={mailOutline} />
                <input
                  type="email"
                  onFocus={() => handleFocus(2)}
                  onBlur={() => handleBlur(2)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value !== "") {
                      setEmailFloat(true);
                    } else {
                      setEmailFloat(false);
                    }
                  }}
                  required
                  className={`${emailFloat ? "float" : ""}`}
                  disabled={load}
                />
                <label htmlFor="email">{t("Email")}:</label>
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
                {load && <span>{t("Loading")}...</span>}
                {!loading && !load && t("Register")}
              </button>
              <div className="register">
                {error && (
                  <p className="error">{t("Username has been registered")}</p>
                )}
                {!error && (
                  <p>
                    {t("Already have an account?")}{" "}
                    <Link href="/login" style={{ color: "black" }}>
                      {t("Login")}
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
      </section>
    </>
  );
};

export default Registerform;
