"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../i18n";
import { useTranslation } from "react-i18next";
import styles from "../src/socialMedia.module.css";
library.add(fab);

const SocialMedia = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.iconFooter}>
      <div className={styles.sm}>
        <a href="#">
          <i>
            <FontAwesomeIcon icon={["fab", "facebook-f"]} />
          </i>
        </a>
        <a href="#">
          <i>
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </i>
        </a>
        <a href="#">
          <i>
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </i>
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UCxfAOHhw3eAXNsgu3dVHGkQ"
        >
          <i>
            <FontAwesomeIcon icon={["fab", "youtube"]} />
          </i>
        </a>
        <a href="#">
          <i>
            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
          </i>
        </a>
      </div>
      <br />
      <hr />
      <p>{t("For better future")}</p>
    </footer>
  );
};

export default SocialMedia;
