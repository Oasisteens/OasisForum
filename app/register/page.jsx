'use client'
import { useSession } from "next-auth/react";
import Registerform from "../../components/registerform/page.jsx";
import { redirect } from "next/navigation";

export default function Register() {
  const session = useSession();

  if (session.status === 'authenticated') redirect("/dashboard");
  if(session.status === 'unauthenticated'){
    return <Registerform />;
  }
}
