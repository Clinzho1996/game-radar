/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";

function Login() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (session.status === "loading") {
    return (
      <div className={styles.loading}>
        <Image src="/loader.svg" alt="loading" width={100} height={100} />
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // Show loading indicator
    setSuccess("");
    setError("Logging in...");

    try {
      // Attempt to log in
      await signIn("credentials", {
        email,
        password,
      });

      // If successful, navigate to the browse page
      router.push("/browse");
    } catch (error) {
      // If there's an error, display it
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google");
    router?.push("/browse");
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <ToastContainer />
      <div className={styles.signup}>
        <div className={styles.credentials}>
          <h2>Welcome Back</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Create a password" required />
            <button type="submit">Log in</button>
          </form>
          <p>
            Don't have an account? <Link href="/register">Sign Up</Link>
          </p>
        </div>
        <div className={styles.google}>
          <h2>You can use social accounts to sign up</h2>

          <button onClick={handleGoogleSignIn} className={styles.googleBtn}>
            Continue with Google
          </button>
          <button onClick={handleGoogleSignIn} className={styles.googleBtnTwo}>
            Continue with Github
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
