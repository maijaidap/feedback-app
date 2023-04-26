import { Box, Button, FormHelperText, Rating, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import styles from "./ReviewForm.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { addReview } from "../../api/api";

const ReviewForm = (): JSX.Element => {
    const [value, setValue] = React.useState<number | null>(1);
    let [grade, setGrade] = useState("");
    let [writtenReview, setWrittenReview] = useState("");
    const [reviewIsValid, setReviewIsValid] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const itemid = location.pathname.split("/")[2];

    function handleChangeGrade(newGrade: string) {
        setGrade(newGrade);
    }

    function handleChangeReview(e: any) {
        // Check whether the review contains any special characters
        const hasSpecialChars = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(
            writtenReview
        );
        setReviewIsValid(!hasSpecialChars);
        setWrittenReview(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem("token");
            if (token == null) token = "";

            const response = await addReview(
                token,
                Number(grade),
                writtenReview,
                Number(itemid)
            );
            console.log(response.data);

            e.target.reset();
            navigate(`/items/${itemid}`);
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
                        if (newValue != null) {
                            setValue(newValue);
                            handleChangeGrade(newValue.toString());
                        }
                    }}
                />
            </Grid2>
            <form className={styles.review}>
                <Typography className={styles.header}>Write review:</Typography>
                <textarea
                    className={styles.text}
                    onChange={handleChangeReview}
                ></textarea>
                {!reviewIsValid && (
                    <FormHelperText error>
                        Review text cannot contain special characters.
                    </FormHelperText>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: 20 }}
                    disabled={!reviewIsValid}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
        </Grid2>
    );
};

export default ReviewForm;
