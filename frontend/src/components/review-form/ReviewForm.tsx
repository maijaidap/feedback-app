import { Box, Button, Rating, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import styles from "./ReviewForm.module.css";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../api/api";

const ReviewForm = (itemid: any): JSX.Element => {
    const [value, setValue] = React.useState<number | null>(1);
    const navigate = useNavigate();
    let [grade, setGrade] = useState("");
    let [writtenReview, setWrittenReview] = useState("");

    function handleChangeGrade(e: any) {
        setGrade(e.target.value);
    }

    function handleChangeReview(e: any) {
        setWrittenReview(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem("token")
            if (token == null) token = "";

            const response = await addReview(token, grade, writtenReview, itemid);
            console.log(response.data);

            e.target.reset();
            navigate(`/items/${itemid}`)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid2 container spacing={2} justifyContent="center">
            <Grid2
                sx={{ width: 300 }}
                className={styles.rating}
                xs={12}
                md={12}
                marginBottom={7}
            >
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
            </Grid2>
            <form className={styles.review}>
                <Typography className={styles.header}>Write review:</Typography>
                <textarea className={styles.text}></textarea>
                <Button
                    href="/item"
                    type="submit"
                    variant="contained"
                    style={{ marginTop: 20 }}
                >
                    Submit
                </Button>
            </form>
        </Grid2>
    );
};

export default ReviewForm;
