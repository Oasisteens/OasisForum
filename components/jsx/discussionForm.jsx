"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "../../app/i18n.js";
import { FaChartPie } from "react-icons/fa";
import { LuFolderTree } from "react-icons/lu";
import Shepherd from "shepherd.js";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DiscNav from "../../app/(components)/DiscNav";
import "../../app/src/discussion.css";

function DiscussionForm({ admin, username }) {
  const [mainTopics, setMainTopics] = useState([]);
  const [navVisible, setNavVisible] = useState(false);
  const [subTopics, setSubTopics] = useState([]);
  const [mainTopic, setMainTopic] = useState("");
  const [topicLoading, setTopicLoading] = useState(false);
  const [error, setError] = useState(false);
  const [color, setColor] = useState("blue");
  const [pie, setPie] = useState(true);

  const { t, i18n } = useTranslation();
  const language = i18n.language.substring(0, 2); // get language from i18n

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", navigator.language.substring(0, 2));
    }
    const selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
    tourInit();
  }, [i18n]); //localstorage get language

  useEffect(() => {
    if (!localStorage.getItem("dashColor")) {
      localStorage.setItem("dashColor", "blue");
    }
    const selectedColor = localStorage.getItem("dashColor");
    if (selectedColor) {
      document.documentElement.style.setProperty(
        "--dash-color",
        `var(--${selectedColor})`,
      );
      document.documentElement.style.setProperty(
        "--scroll-color",
        `var(--${selectedColor}-lighter)`,
      );
      setColor(selectedColor);
    }
  }, []); //localstorage get color

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    // save user option in localStorage
    localStorage.setItem("language", selectedLanguage);
  };

  const changeColor = (event) => {
    const selectedColor = event.target.value;
    if (selectedColor) {
      setColor(selectedColor);
      document.documentElement.style.setProperty(
        "--dash-color",
        `var(--${selectedColor})`,
      );
      document.documentElement.style.setProperty(
        "--scroll-color",
        `var(--${selectedColor}-lighter)`,
      );
      localStorage.setItem("dashColor", selectedColor);
    }
  };

  const tourInit = () => {
    if (!localStorage.getItem("discTour")) {
      localStorage.setItem("discTour", "true");
    }
    if (localStorage.getItem("discTour") === "false") {
      return;
    }
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: false,
        },
      },
      useModalOverlay: true,
    });

    tour.addSteps([
      {
        id: "step1",
        text: t("Click here to open the navigator menu"),
        attachTo: { element: ".menuBtn", on: "bottom" },
        buttons: [
          {
            text: t("Back"),
            action: () => {
              tour.back();
            },
          },
          {
            text: t("Next"),
            action: () => {
              tour.next();
            },
          },
          {
            text: t("End"),
            action: () => {
              tour.cancel();
              const elements = document.querySelectorAll(
                '[class^="shepherd-"]',
              );
              elements.forEach((element) => element.remove());
              localStorage.setItem("discTour", "false");
            },
          },
        ],
      },
      {
        id: "step2",
        text: t("Go back to the intro page"),
        attachTo: { element: ".toIntro", on: "bottom" },
        buttons: [
          {
            text: t("Back"),
            action: () => {
              tour.back();
            },
          },
          {
            text: t("Next"),
            action: () => {
              tour.next();
            },
          },
          {
            text: t("End"),
            action: () => {
              tour.cancel();
              const elements = document.querySelectorAll(
                '[class^="shepherd-"]',
              );
              elements.forEach((element) => element.remove());
              localStorage.setItem("discTour", "false");
            },
          },
        ],
      },
      {
        id: "step3",
        text: t("Click here to go to the search page"),
        attachTo: { element: ".toSearch", on: "bottom" },
        buttons: [
          {
            text: t("Back"),
            action: () => {
              tour.back();
            },
          },
          {
            text: t("Next"),
            action: () => {
              tour.next();
            },
          },
          {
            text: t("End"),
            action: () => {
              tour.cancel();
              const elements = document.querySelectorAll(
                '[class^="shepherd-"]',
              );
              elements.forEach((element) => element.remove());
              localStorage.setItem("discTour", "false");
            },
          },
        ],
      },
      {
        id: "step4",
        text: t("Click here to change the color theme"),
        attachTo: { element: ".color-selector", on: "bottom" },
        buttons: [
          {
            text: t("Back"),
            action: () => {
              tour.back();
            },
          },
          {
            text: t("Next"),
            action: () => {
              tour.next();
            },
          },
          {
            text: t("End"),
            action: () => {
              tour.cancel();
              const elements = document.querySelectorAll(
                '[class^="shepherd-"]',
              );
              elements.forEach((element) => element.remove());
              localStorage.setItem("discTour", "false");
            },
          },
        ],
      },
      {
        id: "step5",
        text: t("Click here to change the language"),
        attachTo: { element: ".language-selector", on: "bottom" },
        buttons: [
          {
            text: t("Back"),
            action: () => {
              tour.back();
            },
          },
          {
            text: t("Next"),
            action: () => {
              tour.cancel();
              const elements = document.querySelectorAll(
                '[class^="shepherd-"]',
              );
              elements.forEach((element) => element.remove());
              localStorage.setItem("discTour", "false");
            },
          },
          {
            text: t("End"),
            action: () => {
              tour.cancel();
              const elements = document.querySelectorAll(
                '[class^="shepherd-"]',
              );
              elements.forEach((element) => element.remove());
              localStorage.setItem("discTour", "false");
            },
          },
        ],
      },
    ]);

    tour.start();
  }; //tour setting (including localStorage setting)

  const handleTour = () => {
    if (localStorage.getItem("discTour") === "false") {
      localStorage.setItem("discTour", "true");
    }
    tourInit();
  }; //start tour

  const getTopics = async () => {
    try {
      setTopicLoading(true);
      const res = await axios.get("/api/fetchTopics");
      setMainTopics(res.data.mainTopics);
      setSubTopics(res.data.subTopics);
      setTopicLoading(false);
    } catch (error) {
      setTopicLoading(false);
      setError(true);
      console.log("Error loading topics", error);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  useEffect(() => {
    if (mainTopics.length > 0) {
      const randomIndex = Math.floor(Math.random() * mainTopics.length);
      setMainTopic(mainTopics[randomIndex]);
    }
  }, [mainTopics]);

  const handleNav = () => {
    setNavVisible(!navVisible);
  };

  const handlePie1 = () => {
    setPie(true);
  };

  const handlePie2 = () => {
    setPie(false);
  };

  return (
    <main className="disc">
      <title>{mainTopic ? mainTopic.title : "Discussion"}</title>
      <div className="discussionTopBar">
        <button className="menuBtn" onClick={handleNav}>
          <svg
            fill="none"
            width="100%"
            height="100%"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
            />
          </svg>
        </button>
        <Link href="intro" className="toIntro">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            width={50}
            height={50}
            viewBox="0 0 512 512"
          >
            <path
              d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z"
              fill="none"
              stroke="wheat"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              d="M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11"
              fill="none"
              stroke="wheat"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
          </svg>
          <span className="intro">{t("Oasis")}</span>
        </Link>
        <Link href="/search" target="_blank" className="toSearch">
          <FontAwesomeIcon icon={faSearch} />
        </Link>
        <h1 className="discussion">
          {mainTopic ? mainTopic.title : "Discussion"}
        </h1>
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
        <button className="tour" onClick={handleTour}>
          {t("Guided Tour")}
        </button>
        <div className="color-selector">
          <select id="color" name="color" onChange={changeColor} value={color}>
            <option value="pink">{t("Pink")}</option>
            <option value="blue">{t("Blue")}</option>
            <option value="purple">{t("Purple")}</option>
            <option value="red">{t("Red")}</option>
            {/* <option value="custom">{t('Custom')}</option> */}
          </select>
          {/* Custom Color hasn't finished */}
          {/* {showColorPicker && (
            <form onSubmit={changeCustomColor}>
              <input type="color" name="customColor" id="customColor" value={color} />
              <button type="submit">{t('Choose')}</button>
            </form>
      )} */}
        </div>
      </div>
      {navVisible && (
        <div className="nav">
          <DiscNav />
        </div>
      )}
      <section className="sec">
        <div className="options">
          <button>
            <FaChartPie
              className={`icon ${pie && "underline"}`}
              size={30}
              onClick={handlePie1}
            />
          </button>
          <button>
            <LuFolderTree
              className={`icon ${!pie && "underline"}`}
              size={30}
              onClick={handlePie2}
            />
          </button>
        </div>
        <div className="preview">
          {pie ? (
            <div className="pie">
              <h1>{t("Pie Chart")}</h1>
              <p>{t("Pie Chart Description")}</p>
            </div>
          ) : (
            <div className="tree">
              <h1>{t("Tree Diagram")}</h1>
              <p>{t("Tree Diagram Description")}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default DiscussionForm;
