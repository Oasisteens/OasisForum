'use client'
import { useSession } from 'next-auth/react'
import Generalform from '@/components/generalform/page';
import { redirect } from "next/navigation";

export default function Discussion() {
  const session = useSession();

  if (session.status === 'unauthenticated') redirect("/");

  if(session.status === 'authenticated') {
    return (
      <main>
        <Generalform username={session.data.user.name} />
      </main>
    );
  }
}
