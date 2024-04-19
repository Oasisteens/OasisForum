// "use client";
// import { useSession } from "next-auth/react";
// import DiscussionForm from "../../components/jsx/discussionForm.jsx";
// import { redirect } from "next/navigation";
// import { useEffect } from "react";
// import axios from "axios";

// export default function Discussion() {
//   let admin;
//   const session = useSession();

//   useEffect(() => {
//     if (session.status === "unauthenticated") {
//       redirect("/login");
//     }
//   }, [session.status]);

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       try {
//         const res = await axios.post("http://localhost:3000/api/fetchAdmin", {
//           username: session.data.user.name,
//         });
//         admin = res.data.admin;
//       } catch (error) {
//         console.log("Error loading admin", error);
//       }
//     };
//     fetchAdmin();
//   }, []);

//   if (session.status === "loading" || session.status === "loaded") {
//     return (
//       <div className="wrapper">
//         <div className="loader" />
//       </div>
//     );
//   }

//   if (session.status === "authenticated") {
//     return (
//       <main>
//         <DiscussionForm admin={admin} username={session.data.user.name} />
//       </main>
//     );
//   }
// }

// Temporarily unavailable

"use client";
import { useRouter } from "next/navigation";
import "../i18n.js";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Discussion() {
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    alert(t("This page is currently under maintanance."));
    router.push("/dashboard");
  }, []);
  return null;
}
