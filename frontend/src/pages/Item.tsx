import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import MainLayout from "../components/main-layout/MainLayout";
import ReviewLine from "../components/review/ReviewLine";

const Item = (): JSX.Element => {
  return (
    <MainLayout>
      <Grid2
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop={5}
      >
        <Typography variant="h4" display="flex" justifyContent="center">
          Item
        </Typography>
        <Button
          href="/add-review"
          type="submit"
          variant="contained"
          style={{ marginTop: 40, marginBottom: 30 }}
        >
          Add review
        </Button>
        <ReviewLine />
      </Grid2>
    </MainLayout>
  );
};

export default Item;
