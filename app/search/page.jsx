"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SearchForm from "../../components/jsx/searchForm.jsx";

export default function Register() {
  const session = useSession();

  if (session.status === "authenticated") {
    return (
      <SearchForm
        username={session.data.user.name}
        image={session.data.user.image || null}
      />
    );
  }
  if (session.status === "loading" || session.status === "loaded") {
    return (
      <div className="wrapper">
        <div className="loader" />
      </div>
    );
  }
  if (session.status === "unauthenticated") {
    return <SearchForm username={null} image={null} />;
  }
}
