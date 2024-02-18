"use client";
import "@/app/src/register.css";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import "@/app/i18n";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { mailOutline, lockClosedOutline, diamondOutline } from "ionicons/icons";
import Link from "next/link";

const Registerform = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [load, setLoad] = useState(true);
  const { t } = useTranslation();

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
        adminCode: adminCode,
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
  return (
    <>
      <title>{t('Register')}</title>
      <section className="Reg">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div className="form-boxR">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2 className="regU">{t('Register')}</h2>
              <div className="inputboxR">
                <IonIcon icon={mailOutline} />
                <input
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={load}
                />
                <label htmlFor="username">{t('Username')}:</label>
              </div>
              <div className="inputboxR">
                <IonIcon icon={lockClosedOutline} />
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={load}
                />
                <label htmlFor="password">{t('Password')}:</label>
              </div>
              {/* <div className="inputbox">
                <IonIcon icon={diamondOutline} />
                <input
                  type="text"
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                />
                <label htmlFor="adminCode">Code (Pi first three digits):</label>
              </div> */}
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
                    <span>{t('Loading')}...</span>
                  </>
                )}
                {load && <span>{t('Loading')}...</span>}
                {!loading && !load && t('Register')}
              </button>
              <div className="register">
                {error && <p className="error">{t('Username has been registered')}</p>}
                {!error && (
                  <p>
                    {t('Already have an account?')}{" "}
                    <Link href="/login" style={{ color: "black" }}>
                      {t('Login')}
                    </Link>
                  </p>
                )}
                <br />
                <p>{t('For better future')}</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registerform;
