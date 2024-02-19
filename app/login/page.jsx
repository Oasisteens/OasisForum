"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loginform from "@/components/loginform/page.jsx";
import { redirect } from "next/navigation";
import "../src/login.css"

export default function Login() {
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      redirect("/dashboard");
    }
  }, [session.status]);
  if (session.status === "loading" || session.status === "loaded") {
    return (
      <div class="ring">
        Loading
        <span className="ringspan"></span>
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    return <Loginform />;
  }
}
