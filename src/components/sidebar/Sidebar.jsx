import React from "react";
import { sidebarData } from "./data";
import Link from "next/link";
import styles from "./sidebar.module.css";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul>
        {sidebarData.map((category, categoryIndex) => (
          <li key={categoryIndex}>
            <span className={styles.categoryHeader}>{category.label}</span>
            {category.subCategories && category.subCategories.length > 0 && (
              <ul>
                {category.subCategories.map((item, subIndex) => (
                  <li key={subIndex}>
                    <Link href={item.route}>
                      {item.icon && (
                        <item.icon
                          className={styles.icon}
                          size={25}
                          color="#fff"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.signOut}>
        <FaSignOutAlt />
        Sign Out
      </div>
    </nav>
  );
};

export default Sidebar;
