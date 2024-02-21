"use client";
import { useEffect } from "react";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    if (!localStorage.getItem("dashColor")) {
      localStorage.setItem("dashColor", "blue");
    }
    const selectedColor = localStorage.getItem("dashColor");
    if (selectedColor !== "blue") {
      document.documentElement.style.setProperty(
        "--ring-color",
        `var(--${selectedColor})`,
      );
    } else {
      document.documentElement.style.setProperty(
        "--ring-color",
        `var(--blue-lightest)`,
      );
    }
  }, []);
  return <SessionProvider>{children}</SessionProvider>;
};
