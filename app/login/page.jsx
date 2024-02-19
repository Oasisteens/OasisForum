'use client'
import { useSession } from "next-auth/react";
import Loginform from "@/components/loginform/page.jsx";
import { redirect } from "next/navigation";

export default function Login() {
  const session = useSession();

  if (session.status === 'authenticated') redirect("/dashboard");
  if(session.status === 'unauthenticated'){
    return (
      <Loginform />
  );
  }
  
}
