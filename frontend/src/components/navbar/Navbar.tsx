import styles from "./Navbar.module.css";
import { IconButton, Link } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";

const Navbar = (): JSX.Element => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/home">
          <span>Feedback app</span>
        </Link>
      </div>
      <div className={styles.links}>
        <IconButton>
          <LogoutIcon style={{ color: "#f1faee" }} fontSize="large" />
        </IconButton>
        <Link href="/login" style={{ color: "#f1faee" }}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
