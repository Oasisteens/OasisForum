'use client'
import { useSession } from 'next-auth/react'
import Dashboardform from "../../components/dashboardform/page.jsx";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    redirect("/login");
  }

  if (session.status === 'authenticated') {
    return <Dashboardform username={session.data.user.name} />;
  }
}