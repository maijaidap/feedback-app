import { Box, Link, Rating } from "@mui/material";
import React from "react";
import styles from "./ItemListItem.module.css";

interface Item {
  name: string;
  category: string;
  avgGrade: number;
  reviewsDone: number;
}

interface ListItemProps {
  item: Item;
}

const ItemListItem = ({ item }: ListItemProps) => {
  return (
    <div className={styles.listItem}>
      <Link href="/review">
        <h2>{item.name}</h2>
      </Link>
      <p>
        <Box className={styles.rating}>
          <Rating name="simple-controlled" readOnly value={item.avgGrade} />
        </Box>
        ({item.reviewsDone} Reviews)
      </p>
    </div>
  );
};

export default ItemListItem;
