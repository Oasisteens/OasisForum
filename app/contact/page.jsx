"use client";
import { useEffect } from "react";
import SocialMedia from "../(icons)/SocialMedia";
import PeopleCircle from "../(icons)/ionIcons/PeopleCircle";
import Chatbubbles from "../(icons)/ionIcons/Chatbubbles";
import "../i18n";
import { useTranslation } from "react-i18next";
import styles from "../src/contact.module.css";

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
    <section className={styles.mainSec}>
      <title>{t("Contact")}</title>
      <nav className={styles.index}>
        <div className={styles.iconContainer}>
          <Chatbubbles />
        </div>
        <li className={styles.contactLi}>
          <a className={styles.webicon} href="/">
            {t("Oasis")}
          </a>
        </li>
      </nav>
      <section className={styles.subSec}>
        <h2 className={styles.contact}>{t("We'd love to hear from you")}</h2>
        <br />
        <hr />
        <p className={styles.curious}>
          {t(
            "Whether you are curious about the latest discussions or looking to join a specific topic, our forum website has got you covered.",
          )}
        </p>
        <br />
        <div className={styles.container}>
          <div className={styles.block}>
            <div className={styles.icon}>
              <PeopleCircle />
            </div>
            <h3 className={styles.username}>{t("Admin")}1</h3>
            <p className={styles.email}>lqn458@gmail.com</p>
          </div>
          <div className={styles.block}>
            <div className={styles.icon}>
              <PeopleCircle />
            </div>
            <h3 className={styles.username}>{t("Admin")}2</h3>
            <p className={styles.email}>aiercroft2007@gmail.com</p>
          </div>
        </div>
      </section>
      <br />
      <br />
      <SocialMedia />
    </section>
  );
};

export default Contact;
