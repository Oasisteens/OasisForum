import Generalform from "@/components/generalform/page.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import axios from "axios";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function general() {
  let admin;
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  try {
    const res = await axios.post("http://localhost:3000/api/fetchAdmin", {
      username: session?.user?.name,
    });
    admin = res.data.admin;
  } catch (error) {
    console.log("Error loading admin", error);
  }

  return (
    <main>
      <Generalform admin={admin} username={session?.user?.name} />
    </main>
  );
}
