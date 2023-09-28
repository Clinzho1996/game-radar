"use client";
import Navbar from "@/components/navbar/Navbar";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "@/components/sidebar/Sidebar";

function Library() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("New");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
    if (session.status === "unauthenticated") {
      router.push("/");
      toast.success("You are not logged in", {
        autoClose: 5000,
      });
    }
  }, [params, session.status, router]);
  return (
    <div className={styles.container}>
      <ToastContainer />
      <Navbar />
      <div className={styles.main}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div>
          <h2>My Library</h2>
        </div>
      </div>
    </div>
  );
}

export default Library;
