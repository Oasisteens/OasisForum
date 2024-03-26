"use client";
import { useSession } from "next-auth/react";
import NewsForm from "../../components/jsx/newsForm.jsx";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function general() {
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
      <NewsForm username={session.data?.user.name} />
    </main>
  );
}
