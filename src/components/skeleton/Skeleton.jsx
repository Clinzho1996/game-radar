// components/SkeletonLoader.js
import React from "react";
import styles from "./skeletonLoader.module.css";

function SkeletonLoader() {
  return (
    <div className={styles.skeletonLoader}>
      <div className={styles.image}></div>
      <div className={styles.text}></div>
    </div>
  );
}

export default SkeletonLoader;
