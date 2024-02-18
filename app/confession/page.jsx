'use client'
import { redirect } from "next/navigation";
import Confessionform from "../../components/confessionform";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  if(session.status === 'unauthenticated') {
    redirect("/login");
  }

  if (session.status === 'authenticated') {
    return <Confessionform username={session.data.user.name} />;
  }
}
