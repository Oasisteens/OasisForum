import Confessionform from "../../components/confessionform";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <Confessionform username={session?.user?.name} />;
  }
}
