import styles from "./MainLayout.module.css";
import { CSSProperties } from "react";
import Navbar from "../navbar/Navbar";
import React from "react";

interface MainLayoutProps {
  width?: CSSProperties["width"];
  children?: JSX.Element;
}

const MainLayout = (props: MainLayoutProps): JSX.Element => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div>{props.children}</div>
    </div>
  );
};

export default MainLayout;
