import MainLayout from "../components/main-layout/MainLayout";
import Grid2 from "@mui/material/Unstable_Grid2";
import { List, Typography } from "@mui/material";
import React from "react";
import ItemListItem from "../components/feedback-list-item/ItemListItem";

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
  {
    id: "2",
    name: "Item3",
    category: "Electronics",
    avgGrade: 8.8,
    reviewsDone: 3,
  },
  {
    id: "3",
    name: "Item3",
    category: "Electronics",
    avgGrade: 8.8,
    reviewsDone: 3,
  },
  {
    id: "1",
    name: "Item1",
    category: "Electronics",
    avgGrade: 8.8,
    reviewsDone: 3,
  },
  {
    id: "2",
    name: "Item3",
    category: "Electronics",
    avgGrade: 8.8,
    reviewsDone: 3,
  },
  {
    id: "3",
    name: "Item3",
    category: "Electronics",
    avgGrade: 8.8,
    reviewsDone: 3,
  },
];

const Home = (): JSX.Element => {
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
            Items
          </Typography>
        </Grid2>
        <List className="full-width">
          {items.map((item) => (
            <ItemListItem item={item} />
          ))}
        </List>
      </Grid2>
    </MainLayout>
  );
};

export default Home;
