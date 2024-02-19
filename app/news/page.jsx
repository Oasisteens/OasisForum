"use client";
import { useSession } from "next-auth/react";
import NewsForm from "@/components/newsForm.jsx";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function general() {
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      redirect("/login");
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

  if (session.status === "authenticated") {
    return (
      <main>
        <NewsForm username={session.data.user.name} />
      </main>
    );
  }
}
