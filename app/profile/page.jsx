"use client";
import { useSession } from "next-auth/react";
import UserInfo from "@/components/userinfo/page.jsx";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function profile() {
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
    return <UserInfo />;
  }
}
