"use client";
import React from "react";
import Resetform from "../../../components/jsx/resetform.jsx";
import { useEffect } from "react";
import "../../i18n.js";
import { useTranslation } from "react-i18next";

const Page = ({ params: { id } }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", navigator.language.substring(0, 2));
    }
    const selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]); //localstorage get language setting

  return <Resetform id={id} />;
};

export default Page;
