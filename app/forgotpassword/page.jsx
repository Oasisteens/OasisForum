"use client";
import { useSession } from "next-auth/react";
import Forgotform from "../../components/jsx/forgotform";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Forgotpassword() {
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
    return <Forgotform />;
  }
}
