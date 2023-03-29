import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import styles from "./ReviewForm.module.css";

const ReviewForm = (): JSX.Element => {
  return (
    <Grid2 container spacing={2} display="flex" justifyContent="center">
      <form className={styles.review}>
        <Typography className={styles.header}>Write review:</Typography>
        <textarea className={styles.text}></textarea>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </Grid2>
  );
};

export default ReviewForm;
