"use client";
import { useEffect } from "react";
import SocialMedia from "../(icons)/SocialMedia";
import Chatbubbles from "../(icons)/ionIcons/Chatbubbles";
import AlertCircle from "../(icons)/ionIcons/AlertCircle";
import Construct from "../(icons)/ionIcons/Construct";
import "../i18n";
import { useTranslation } from "react-i18next";
import LockClosed from "../(icons)/ionIcons/LockClosed";
import Megaphone from "../(icons)/ionIcons/Megaphone";
import People from "../(icons)/ionIcons/People";
import ShieldHalf from "../(icons)/ionIcons/ShieldHalf";
import "../src/intro.css";
const Intro = () => {
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

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    // save user option in localStorage
    localStorage.setItem("language", selectedLanguage);
  };
  return (
    <>
      <title>{t("Oasis")}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <nav className="index">
        <div className="icon-container">
          <Chatbubbles />
        </div>
        <a className="webicon" href="intro">
          {t("Oasis")}
        </a>
        <div className="gradient-text">
          <a className="channel c1" href="general">
            {t("Posts")}
          </a>
          <a className="channel c2" href="register">
            {t("Register")}
          </a>
          <a className="channel c3" href="news">
            {t("News")}
          </a>
          <a className="channel c4" href="contact">
            {t("Contact")}
          </a>
        </div>
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
      </nav>
      <header>
        <h1 className="intro">{t("Welcome to the Oasis!")}</h1>
        <hr />
        <p>
          {t(
            "Welcome to our forum website, the ultimate platform for engaging discussions and connecting with like-minded individuals. Whether you are seeking expert advice, sharing your experiences, or simply looking to expand your knowledge, our forum offers a vibrant community where you can ask questions, contribute insights, and immerse yourself in a diverse range of topics. Join us and be part of the conversation today!",
          )}
        </p>
      </header>
      <section>
        <h1 className="intro">{t("About Us")}</h1>
        <hr />
        <p>
          {t(
            "Our forum is a community-driven platform that encourages open discussions, fosters learning, and promotes respectful interactions. We believe in the power of diverse perspectives and the value of constructive contributions. Our guidelines are designed to ensure a safe and inclusive environment for everyone. Join us and be part of the conversation today!",
          )}
        </p>
        <div className="container">
          <div className="block">
            <div className="icon">
              <People />
            </div>
            <h3>{t("Diverse Community")}</h3>
            <p>
              {t(
                "Celebrating diversity, embracing perspectives, valuing everyone's voice",
              )}
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <Megaphone />
            </div>
            <h3>{t("Engaging Discussions")}</h3>
            <p>
              {t(
                "Topics span tech, arts, sports, current events; engage with like-minded members",
              )}
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <Construct />
            </div>
            <h3>{t("Constructive Contributions")}</h3>
            <p>
              {t(
                "Contribute insight, share experiences, foster learning in constructive discussions",
              )}
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <ShieldHalf />
            </div>
            <h3>{t("No Spam or Self-Promotion")}</h3>
            <p>
              {t(
                "Avoid spam, excessive self-promo; share responsibly in designated areas",
              )}
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <LockClosed />
            </div>
            <h3>{t("Privacy and Confidentiality")}</h3>
            <p>
              {t(
                "Respect privacy, do not share personal or confidential content",
              )}
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <AlertCircle />
            </div>
            <h3>{t("Reporting Issues")}</h3>
            <p>
              {t(
                "Report guideline violations or issues to moderators for a safe community",
              )}
            </p>
          </div>
        </div>
      </section>
      <br />
      <br />
      <SocialMedia />
    </>
  );
};

export default Intro;
