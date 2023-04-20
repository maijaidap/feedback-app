import { Box, Link, Rating } from "@mui/material";
import React from "react";
import styles from "./ItemListItem.module.css";

interface Item {
  id: string;
  name: string;
  avgGrade: string;
  reviewsDone: string;
}

interface ListItemProps {
  item: Item;
}

const ItemListItem = ({ item }: ListItemProps) => {
  return (
    <div className={styles.listItem}>
      <Link href="/item">
        <h2>{item.name}</h2>
      </Link>
      <span>
        <Box className={styles.rating}>
          <Rating
            name="simple-controlled"
            readOnly
            value={Number(item.avgGrade)}
          />
        </Box>
        ({item.reviewsDone} Reviews)
      </span>
    </div>
  );
};

export default ItemListItem;
