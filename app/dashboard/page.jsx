import Dashboardform from "../../components/dashboardform/page.jsx";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <Dashboardform username={session?.user?.name} />;
  }
}
