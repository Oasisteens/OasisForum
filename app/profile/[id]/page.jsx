"use client";
import { useSession } from "next-auth/react";
import UserInfo from "../../../components/jsx/userinfo/page.jsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function profile({ params: { id } }) {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [unAuthImg, setUnAuthImg] = useState(null);
  const { update } = useSession();

  const router = useRouter();

  const updateSession = async (avatar) => {
    await update({
      ...session.data,
      user: {
        ...session.data.user,
        image: avatar,
      },
    });
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("/api/getUserId", {
          params: { username: id },
        });
        if (response.status === 200) {
          if (
            session.status === "authenticated" ||
            session.status === "unauthenticated"
          ) {
            setAuth(id === session?.data?.user?.name);
            if (!auth) {
              setUnAuthImg(response.data.user.image);
            }
            setLoading(false);
          }
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/404");
      }
    };

    fetchUserId();
  }, [session.status]);
  return loading ? (
    <div className="wrapper">
      <div className="loader" />
    </div>
  ) : (
    <UserInfo
      username={
        session?.data?.user?.name === id ? session?.data?.user?.name : id
      }
      image={
        session?.data?.user?.image === unAuthImg
          ? session?.data?.user?.image
          : unAuthImg
      }
      updateSession={updateSession}
      auth={auth}
    />
  );
}
