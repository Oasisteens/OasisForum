"use client";
import { useSession } from "next-auth/react";
import Generalform from "../../components/jsx/generalform/page.jsx";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Discussion() {
  const session = useSession();

  if (session.status === "loading" || session.status === "loaded") {
    return (
      <div className="wrapper">
        <div className="loader" />
      </div>
    );
  }
  return (
    <main>
      <Generalform username={session.data?.user?.name} />
    </main>
  );
}
