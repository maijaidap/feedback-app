import { Edit } from "@mui/icons-material";
import { Box, IconButton, Link, ListItem, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
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
      <Link>
        <h2>{item.name}</h2>
      </Link>
      <p>
        {item.avgGrade} ({item.reviewsDone} Reviews)
      </p>
    </div>
  );
};

export default ItemListItem;
