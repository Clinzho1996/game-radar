"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";

function Register() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
    if (session.status === "authenticated") {
      router?.push("/browse");
    }
  }, [params, session.status, router]);

  if (session.status === "loading") {
    return (
      <div className={styles.loading}>
        <Image src="/loader.svg" alt="loading" width={100} height={100} />
      </div>
    );
  }

  const handleGoogleSignIn = () => {
    signIn("google"); // Move the signIn call to the click handler
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 201) {
        toast.success("Account created successfully.", {
          autoClose: 3000,
          onClose: () => {
            router?.push("/");
          },
        });
      } else {
        toast.error("Registration failed", {
          autoClose: 3000,
        });
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <ToastContainer />
      <div className={styles.signup}>
        <div className={styles.credentials}>
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Create a password" required />
            <button type="submit">Sign up</button>
          </form>
          <p>
            Already have an account? <Link href="/">Log in</Link>
          </p>
        </div>
        <div className={styles.google}>
          <h2>You can use social accounts to sign up</h2>

          <button onClick={handleGoogleSignIn}>Continue with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
