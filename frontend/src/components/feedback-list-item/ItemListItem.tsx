import { Box, Link, Rating } from "@mui/material";
import React, { useState } from "react";
import styles from "./ItemListItem.module.css";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate(`/items/${item.id}`);
    };

    return (
        <div className={styles.listItem}>
            <Link onClick={handleClick}>
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
