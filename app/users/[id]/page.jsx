"use client";
import React from "react";
import Userform from "../../../components/jsx/userform.jsx";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import "../../i18n.js";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";

const Page = ({ params: { id } }) => {
  const session = useSession();
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
  }, [i18n]); //localstorage get language setting

  useEffect(() => {
    if (session.status === "unauthenticated") {
      alert(
        t("You must log in to view a specific post, redirecting to login..."),
      );
      redirect("/login");
    }
  }, [session.status]);

  if (session.status === "loading" || session.status === "loaded") {
    return (
      <div className="wrapper">
        <div className="loader" />
      </div>
    );
  }

  if (session.status === "authenticated") {
    return <Userform id={id} username={session.data.user.name} />;
  }
};

export default Page;
