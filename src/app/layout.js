import AuthProvider from "@/components/AuthProvider/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameRadar | Dev-Clinton",
  description: "Developed by Confidence Emonena Ochuko",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
