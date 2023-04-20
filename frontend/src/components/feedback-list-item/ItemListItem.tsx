import { Box, Link, Rating } from "@mui/material";
import React from "react";
import styles from "./ItemListItem.module.css";

interface Item {
    id: string;
    name: string;
    avggrade: string;
    reviewsdone: string;
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
                        value={Number(item.avggrade)}
                    />
                </Box>
                ({item.reviewsdone} Reviews)
            </span>
        </div>
    );
};

export default ItemListItem;
