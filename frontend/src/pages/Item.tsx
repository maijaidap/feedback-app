import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import MainLayout from "../components/main-layout/MainLayout";
import ReviewLine from "../components/review/ReviewLine";
import { getItemName, getReviews } from "../api/api";
import { useEffect, useState } from "react";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Review {
    id: string;
    grade: string;
    written_review: string;
    date_written: string;
}

const Item = (): JSX.Element => {
    const location = useLocation();
    const itemid = location.pathname.split("/")[2];
    const [itemName, setItemName] = useState("");
    const [reviews, setitems] = useState<Review[]>([]);
    const navigate = useNavigate();
    const [isAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") ?? ""
    );

    const handleClick = async () => {
        navigate(`/items/${itemid}/add-review`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const resultReviews = await getReviews(itemid);
            setitems(resultReviews.data);

            const resultItemName = await getItemName(Number(itemid));
            setItemName(resultItemName.data);
        };
        fetchData();
    }, []);

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
                    {itemName}
                </Typography>
                {!isAuthenticated ? (
                    <Typography fontWeight={"bold"}>
                        In order to add reviews, you must first login
                    </Typography>
                ) : (
                    ""
                )}
                {isAuthenticated ? (
                    <Button
                        onClick={handleClick}
                        type="submit"
                        variant="contained"
                        style={{ marginTop: 40, marginBottom: 30 }}
                    >
                        Add review
                    </Button>
                ) : (
                    ""
                )}

                {reviews.map((review) => (
                    <ReviewLine key={review.id} review={review} />
                ))}
            </Grid2>
        </MainLayout>
    );
};

export default Item;
