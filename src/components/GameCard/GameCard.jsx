import React from "react";
import styles from "./game.module.css";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { iconMap } from "@/utils/iconsMap";

function getPlatformIcon(platformId) {
  const IconComponent = iconMap[platformId];

  if (IconComponent) {
    return <IconComponent size="1.5em" color="#ffffffaf" />;
  }

  return null;
}

function GameCard({ game }) {
  // Map platform data to JSX elements
  const platformIcons = game.platforms?.map((platformData) => {
    console.log("Platform ID:", platformData.platform.id);
    return (
      <li key={platformData.platform.id}>
        {getPlatformIcon(platformData.platform.slug)}
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
