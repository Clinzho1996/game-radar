import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../navbar/Navbar";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import SkeletonLoader from "../skeleton/Skeleton";
import Image from "next/image";
import axios from "axios";
import { iconMap } from "@/utils/iconsMap";

function getPlatformIcon(platformId) {
  const IconComponent = iconMap[platformId];

  if (IconComponent) {
    return <IconComponent size="1.5em" color="#ffffffaf" />;
  }

  return null;
}

function GameDetails({ game }) {
  const { data: session, status } = useSession();
  const [value, setValue] = useState("");
  const router = useRouter();

  const platformIcons = game.platforms.map((platformData) => {
    console.log("Platform ID:", platformData.platform.id);
    return (
      <li key={platformData.platform.id}>
        {getPlatformIcon(platformData.platform.slug)}
      </li>
    );
  });

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
      localStorage.setItem("searchText", value);
      router.push("/search", { state: value, replace: true });
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

  const [screenshots, setScreenshots] = useState([]);

  const fetchGameScreenshots = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${game.id}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      );
      const screenshotsData = response.data.results; // Assuming the screenshots are in the 'results' property
      setScreenshots(screenshotsData);
    } catch (error) {
      console.error("Error fetching game screenshots:", error);
    }
  };

  useEffect(() => {
    fetchGameScreenshots();
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div
        className="banner-single"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),url(${game.background_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "40vh",
          backgroundColor: "#000",
          padding: "2% 4%",
        }}
        key={game.id}
      >
        <Navbar />
      </div>

      <div className={styles.main}>
        <Sidebar className={styles.sidebar} />
        <div className={styles.gameContainer}>
          <div className={styles.gameDetails}>
            <div className={styles.item}>
              <ul>{platformIcons}</ul>

              <h2>{game.name}</h2>
              <p>
                <span>Release date</span> {game.released}
              </p>
            </div>
            <div className={styles.about}>
              <h3>About</h3>
              <p>{game.description}</p>
            </div>
            <div className={styles.item}>
              <p>
                <span>Website</span> {game.website}
              </p>
            </div>
            <div className={styles.item}>
              <p>
                <span>Rating</span> #{game.ratings_count}
              </p>
            </div>
            <div className={styles.item}>
              <p>
                <span>Achievment</span> #{game.achievements_count}
              </p>
            </div>
            <div className={styles.item}>
              <p>
                <span>Playtime</span> {game.playtime} mins
              </p>
            </div>
            <div className={styles.item}>
              <p>
                <span>No. of Creators</span> {game.creators_count}
              </p>
            </div>
          </div>
          <div className={styles.screenshot}>
            {screenshots.map((screenshot, index) => (
              <Image
                key={index}
                src={screenshot.image}
                alt={`Screenshot ${index + 1}`}
                width={300}
                height={200}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
