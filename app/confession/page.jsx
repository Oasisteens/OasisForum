"use client";
import { redirect } from "next/navigation";
import Confessionform from "../../components/jsx/confessionform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();

  if (session.status === "loading" || session.status === "loaded") {
    return (
      <div className="wrapper">
        <div className="loader" />
      </div>
    );
  }

  return <Confessionform username={session.data?.user.name} />;
}
