import NewsForm from "@/components/newsForm.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import axios from "axios";
import { authOptions } from "../api/auth/[...nextauth]/route.js";
import { metadata } from "../layout.js";

export default async function general() {
  let admin;
  metadata.title = "News";
  const session = await getServerSession(authOptions);

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
      <NewsForm admin={admin} username={session?.user?.name} />
    </main>
  );
}
