"use client";
import { redirect } from "next/navigation";
import Confessionform from "../../components/confessionform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
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
    return <Confessionform username={session.data.user.name} />;
  }
}
