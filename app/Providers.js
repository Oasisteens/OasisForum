"use client";
// Import the SessionProvider from next-auth/react
import { SessionProvider } from "next-auth/react";
import "./i18n";

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
