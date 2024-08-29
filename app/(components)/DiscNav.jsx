"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../src/discnav.module.css";
import "../i18n";
import { useTranslation } from "react-i18next";

const DiscNav = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [lift, setLift] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className={styles.dash}>
      <div className={styles.navContainer}>
        <div className={styles.navDblock}>
          <Link
            href="/profile"
            className={`${styles.iconProfile} ${styles.icon}`}
          >
            <Image
              src="/person-circle-outline.svg"
              width="60"
              height="60"
              alt="person"
            />
          </Link>
        </div>
        <Link
          onMouseEnter={() => {
            setActiveIcon("icon-2");
            setLift(true);
          }}
          onMouseLeave={() => {
            setActiveIcon(null);
            setLift(false);
          }}
          href="/general"
          className={styles.navDblock}
        >
          <div
            className={`${styles.icon} ${styles.icon2} ${activeIcon === "icon-2" && lift ? styles.lift : ""}`}
          >
            <Image
              src="/earth-outline.svg"
              width="40"
              height="40"
              alt="earth"
            />
          </div>
          <li className={styles.nav}>
            <p className={styles.channel}>{t("General")}</p>
          </li>
        </Link>
        <Link
          onMouseEnter={() => {
            setActiveIcon("icon-3");
            setLift(true);
          }}
          onMouseLeave={() => {
            setActiveIcon(null);
            setLift(false);
          }}
          href="/news"
          className={styles.navDblock}
        >
          <div
            className={`${styles.icon} ${styles.icon3} ${activeIcon === "icon-3" && lift ? styles.lift : ""}`}
          >
            <Image
              src="/chatbox-outline.svg"
              width="40"
              height="40"
              alt="chatbox"
            />
          </div>
          <li className={styles.nav}>
            <p className={styles.channel}>{t("News")}</p>
          </li>
        </Link>
        <Link
          onMouseEnter={() => {
            setActiveIcon("icon-4");
            setLift(true);
          }}
          onMouseLeave={() => {
            setActiveIcon(null);
            setLift(false);
          }}
          href="/confession"
          className={styles.navDblock}
        >
          <div
            className={`${styles.icon} ${styles.icon4} ${activeIcon === "icon-4" && lift ? styles.lift : ""}`}
          >
            <Image src="/heart.svg" width="40" height="40" alt="heart" />
          </div>
          <li className={styles.nav}>
            <p className={styles.channel}>{t("Confession")}</p>
          </li>
        </Link>
        <Link
          onMouseEnter={() => {
            setActiveIcon("icon-5");
            setLift(true);
          }}
          onMouseLeave={() => {
            setActiveIcon(null);
            setLift(false);
          }}
          href="/discussion"
          className={styles.navDblock}
        >
          <div
            className={`${styles.icon} ${styles.icon5} ${activeIcon === "icon-5" && lift ? styles.lift : ""}`}
          >
            <Image src="/book-outline.svg" width="40" height="40" alt="book" />
          </div>
          <li className={styles.nav}>
            <p className={styles.channel}>{t("Discussion")}</p>
          </li>
        </Link>
      </div>
    </nav>
  );
};

export default DiscNav;
