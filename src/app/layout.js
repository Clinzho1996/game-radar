import { SessionProvider } from "@/components/AuthProvider/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import Login from "@/components/Login";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameRadar | Dev-Clinton",
  description: "Developed by Confidence Emonena Ochuko",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? <Login /> : <div>{children}</div>}
        </SessionProvider>
      </body>
    </html>
  );
}
