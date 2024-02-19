'use client'
import { useSession } from "next-auth/react";
import NewsForm from "@/components/newsForm.jsx";
import { redirect } from "next/navigation";

export default function general() {
  const session = useSession();

  if(session.status === 'unauthenticated'){ redirect("/login") }

  if(session.status === 'authenticated'){
    return (
      <main>
        <NewsForm username={session.data.user.name} />
      </main>
    );
  }
}
