"use client";
import React, { useState, useEffect } from "react";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./navbar.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { data: session, status } = useSession(); // Destructure `data` from the session object
  const [value, setValue] = useState("");
  const router = useRouter();

  // Load the search text from localStorage on component mount
  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText");
    if (savedSearchText) {
      setValue(savedSearchText);
    }
  }, []);

  // Function to get the name initials from the user's name
  const getNameInitials = (name) => {
    if (!name) return "";
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return initials.toUpperCase();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (value) {
      // Save the search text to localStorage
      localStorage.setItem("searchText", value);

      // Navigate to the search page
      router.push("/search", { state: value, replace: true });

      // Clear the input field
      setValue("");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("You are successfully signed out.", {
      autoClose: 5000,
      onClose: () => {
        router?.push("/");
      },
    });
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar">
        <div className="logo">
          <Link href="/">
            <h2>GameRadar</h2>
          </Link>
        </div>
        <div className={styles.mobile}>
          <Link href="/">
            <h2>GR</h2>
          </Link>
        </div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search 854,226 games"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">
            <FiSearch color="#fff" size={20} />
          </button>
        </form>
        {session?.user ? (
          <div className={styles.userContainer}>
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="profile"
                width={30}
                height={30}
              />
            ) : (
              <div className={styles.nameDetails}>
                <h2>{getNameInitials(session.user.name)}</h2>
              </div>
            )}
            <h3>{session.user.name}</h3>
            <FiLogOut
              onClick={handleSignOut}
              className={styles.signOut}
              size={25}
            />
          </div>
        ) : (
          <div className={styles.signin}>
            <Link href="/login">Log In</Link>
            <Link href="/register" className={styles.register}>
              <FaUser /> Sign Up
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
