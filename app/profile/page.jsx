'use client'
import { useSession } from "next-auth/react";
import UserInfo from "@/components/userinfo/page.jsx";
import { redirect } from "next/navigation";

export default function profile() {
  const session = useSession();
  if (session.status === 'unauthenticated') {
    redirect("/login");
  }
  if(session.status === 'authenticated'){
    return <UserInfo />;
  }
 
}
