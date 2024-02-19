"use client";
import { useEffect } from "react";
import SocialMedia from "../(icons)/SocialMedia";
import PeopleCircle from "../(icons)/ionIcons/PeopleCircle";
import Chatbubbles from "../(icons)/ionIcons/Chatbubbles";
import "@/app/i18n";
import { useTranslation } from "react-i18next";
import "../src/contact.css";
const Contact = () => {
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
  return (
    <>
      <title>{t("Contact")}</title>
      <meta charSet="UTF-8" />
      <nav className="index">
        <div className="icon-container">
          <Chatbubbles />
        </div>
        <li>
          <a className="webicon" href="intro">
            {t("Oasis")}
          </a>
        </li>
      </nav>
      <section>
        <h2 className="contact">{t("We'd love to hear from you")}</h2>
        <br />
        <hr />
        <p className="curious">
          {t(
            "Whether you are curious about the latest discussions or looking to join a specific topic, our forum website has got you covered.",
          )}
        </p>
        <br />
        <div className="container">
          <div className="block">
            <div className="icon">
              <PeopleCircle />
            </div>
            <h3 className="username">{t("Admin")}1</h3>
            <p className="email">lqn458@gmail.com</p>
          </div>
          <div className="block">
            <div className="icon">
              <PeopleCircle />
            </div>
            <h3 className="username">{t("Admin")}2</h3>
            <p className="email">aiercroft2007@gmail.com</p>
          </div>
        </div>
      </section>
      <br />
      <br />
      <SocialMedia />
    </>
  );
};

export default Contact;
