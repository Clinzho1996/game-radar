import React from "react";
import styles from "./game.module.css";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  FaInternetExplorer,
  FaLinux,
  FaMobile,
  FaPhone,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { BsNintendo } from "react-icons/bs";

function getPlatformIcon(platformId) {
  switch (platformId) {
    case 5: // Assuming 6 corresponds to PlayStation
      return <FaPlaystation size="1.5em" color="#ffffffaf" />;
    case 4: // Assuming 4 corresponds to Xbox
      return <FaXbox size="1.5em" color="#ffffffaf" />;
    case 3: // Assuming 4 corresponds to Xbox
      return <FaMobile size="1.5em" color="#ffffffaf" />;
    case 2: // Assuming 4 corresponds to Xbox
      return <BsNintendo size="1.5em" color="#ffffffaf" />;
    case 1: // Assuming 1 corresponds to Windows
      return <FaWindows size="1.5em" color="#ffffffaf" />;
    case 0: // Assuming 1 corresponds to Windows
      return <FaLinux size="1.5em" color="#ffffffaf" />;
    default:
      return null;
  }
}

function GameCard({ game }) {
  console.log("game.platforms:", game.platforms);

  // Map platform data to JSX elements
  const platformIcons = game.platforms.map((platformData) => {
    console.log("Platform ID:", platformData.platform.id);
    return (
      <li key={platformData.platform.id}>
        {getPlatformIcon(platformData.platform.id)}
        {platformData.name}
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <Link href={`/games/${game.id}`}>
        <Image
          src={game.background_image}
          alt={`${game.name} cover`}
          width={270}
          height={180}
        />
      </Link>
      <div className={styles.item}>
        <ul>{platformIcons}</ul>
        <h4>{game.name}</h4>
        <p>
          <span>Release date</span> {game.released}
        </p>
      </div>
    </div>
  );
}

export default GameCard;
