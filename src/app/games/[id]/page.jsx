"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import GameDetails from "@/components/GameDetails/GameDetails";
import { useRouter } from "next/navigation";

function GameDetailsPage({ params }) {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
        );
        const gameData = response.data;
        setGame(gameData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchGameDetails();
  }, [id]);

  // Check if 'id' exists and is not undefined
  if (id === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isLoading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
      {isError && <p>Error fetching data</p>}
      {game && <GameDetails game={game} />}
    </div>
  );
}

export default GameDetailsPage;
