import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../navbar/Navbar";
import styles from "./page.module.css";
import Sidebar from "../sidebar/Sidebar";
import Image from "next/image";
import axios from "axios";
import { iconMap } from "@/utils/iconsMap";
import ReactHtmlParser from "react-html-parser";

function getPlatformIcon(platformId) {
  console.log("Platform ID:", platformId);
  const IconComponent = iconMap[platformId]?.default;

  if (IconComponent) {
    return <IconComponent size="1.5em" color="#ffffffaf" />;
  }

  return null;
}

function GameDetails({ game }) {
  const platformIcons = game.platforms?.map((platformData) => {
    console.log("Platform ID:", platformData.platform.id);
    return (
      <li key={platformData.platform.id}>
        {getPlatformIcon(platformData.platform.slug)}
      </li>
    );
  });

  const [screenshots, setScreenshots] = useState([]);
  const [loadingScreenshots, setLoadingScreenshots] = useState(true);
  const [creators, setCreators] = useState([]);
  const [loadingCreators, setLoadingCreators] = useState(true);

  const fetchGameScreenshots = async () => {
    try {
      setLoadingScreenshots(true);
      const response = await axios.get(
        `https://api.rawg.io/api/games/${game.id}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      );
      const screenshotsData = response.data.results;
      setScreenshots(screenshotsData);
    } catch (error) {
      console.error("Error fetching game screenshots:", error);
    } finally {
      setLoadingScreenshots(false);
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgb(21, 21, 21)),url(${game.background_image})`,
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
              <p>{ReactHtmlParser(game.description)}</p>
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
            {loadingScreenshots ? (
              <div className={styles.loadingScreenshots}>
                <Image
                  src="/loader.svg"
                  alt="Loading..."
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <>
                {screenshots.map((screenshot, index) => (
                  <div key={index}>
                    <Image
                      src={screenshot.image}
                      alt={`Screenshot ${index + 1}`}
                      width={300}
                      height={200}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
