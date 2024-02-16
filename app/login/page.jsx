import Loginform from "@/components/loginform/page.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <>
      <Loginform />
    </>
  );
}
