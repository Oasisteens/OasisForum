import "typeface-raleway";
import "./globals.css";
import { AuthProvider } from "./Providers";

export const metadata = {
  title: "Oasis",
  description: "Free Forum for All",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
