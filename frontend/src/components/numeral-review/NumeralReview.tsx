import { Box, Rating, Typography } from "@mui/material";
import styles from "./NumeralReview.module.css";
import React from "react";

const NumeralReview = (): JSX.Element => {
  const [value, setValue] = React.useState<number | null>(1);
  return (
    <Box sx={{ width: 300 }} className={styles.rating}>
      <Typography className={styles.header}>
        Overall grade for the item:
      </Typography>
      <Rating
        size="large"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};

export default NumeralReview;
