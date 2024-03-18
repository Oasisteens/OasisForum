"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loginform from "../../components/jsx/loginform/page.jsx";
import { redirect } from "next/navigation";
import "../src/loader.css";

export default function Login() {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      redirect("/dashboard");
    }
  }, [session.status]);
  if (session.status === "loading" || session.status === "loaded") {
    return (
      <div className="wrapper">
        <div className="loader" />
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    return <Loginform />;
  }
}
