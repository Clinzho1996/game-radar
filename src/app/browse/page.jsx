"use client";
import Navbar from "@/components/navbar/Navbar";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "@/components/sidebar/Sidebar";
import GameCard from "@/components/GameCard/GameCard";
import axios from "axios";
import SkeletonLoader from "@/components/skeleton/Skeleton";

function Browse() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);

  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games from the RAWG API
    axios
      .get(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      )
      .then((response) => {
        setGames(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
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
        <Sidebar className={styles.sidebar} />
        <div className={styles.gameContainer}>
          <h2>This Week</h2>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className={styles.gameGrid}>
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;
