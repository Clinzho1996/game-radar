"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/sidebar/Sidebar";
import GameCard from "@/components/GameCard/GameCard";
import Image from "next/image";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

function Search() {
  const { data: session, status } = useSession();
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load the saved search text from localStorage on component mount
  useEffect(() => {
    const savedText = localStorage.getItem("searchText");
    if (savedText) {
      setSearchText(savedText);
    }
  }, []);

  const fetchSearch = async () => {
    if (searchText.trim() === "") {
      return;
      l;
    }
    setIsLoading(true);
    try {
      const data = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchText}`
      );
      const { results } = await data.json();
      setContent(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get the name initials from the user's name
  const getNameInitials = (name) => {
    if (!name) return "";
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return initials.toUpperCase();
  };

  // Fetch search results when the component mounts or when searchText changes
  useEffect(() => {
    fetchSearch();
  }, [searchText]);

  const Trigger = (e) => {
    setSearchText(e.target.value);
  };

  const Search = (e) => {
    e.preventDefault();
    fetchSearch();
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
    <div className={styles.container}>
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
        <form onSubmit={Search}>
          <input
            type="text"
            placeholder="Search 854,226 games"
            onChange={Trigger}
            value={searchText}
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
      <div className={styles.main}>
        <Sidebar className={styles.sidebar} />
        <div className={styles.gameContainer}>
          {isLoading ? (
            // Display a loading indicator while fetching
            <div className={styles.loading}>
              <Image src="/loader.svg" alt="loading" width={100} height={100} />
            </div>
          ) : (
            <>
              <h2 className="searchText">
                Search Results for{" "}
                <span style={{ color: "red", textTransform: "capitalize" }}>
                  {searchText}
                </span>
              </h2>
              <div className={styles.gameGrid}>
                {content.map((game) => (
                  <div className="search-page" key={game.id}>
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
