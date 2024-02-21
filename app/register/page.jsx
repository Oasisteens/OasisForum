"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Registerform from "../../components/registerform/page.jsx";
import { redirect } from "next/navigation";

export default function Register() {
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
    return <Registerform />;
  }
}
