import MainLayout from "../components/main-layout/MainLayout";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import NumeralReview from "../components/numeral-review/NumeralReview";
import { Typography } from "@mui/material";

interface Item {
  id: string;
  name: string;
  category: string;
  avgGrade: number;
  reviewsDone: number;
}

const items: Item[] = [
  {
    id: "1",
    name: "Item1",
    category: "Electronics",
    avgGrade: 8.8,
    reviewsDone: 3,
  },
];

const AddReview = (): JSX.Element => {
  return (
    <MainLayout>
      <Grid2
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        marginTop={5}
      >
        <Grid2 xs={12} margin={2}>
          <Typography variant="h4" display="flex" justifyContent="center">
            Item
          </Typography>
        </Grid2>
        <Grid2 container spacing={1} justifyContent="center" marginTop={5}>
          <NumeralReview />
        </Grid2>
      </Grid2>
    </MainLayout>
  );
};

export default AddReview;
