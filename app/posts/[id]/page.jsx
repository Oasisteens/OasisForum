"use client";
import React from "react";
import Postform from "../../../components/jsx/postform.jsx";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Page = ({ params: { id } }) => {
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
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
    return <Postform id={id} username={session.data.user.name} />;
  }
};

export default Page;
