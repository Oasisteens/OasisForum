import UserInfo from "@/components/userinfo/page.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function profile() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return <UserInfo />;
}
