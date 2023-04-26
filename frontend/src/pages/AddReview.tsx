import MainLayout from "../components/main-layout/MainLayout";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ReviewForm from "../components/review-form/ReviewForm";
import { getItemName } from "../api/api";
import { useLocation } from "react-router-dom";

const AddReview = (): JSX.Element => {
    const [itemName, setItemName] = useState("");
    const location = useLocation();
    const itemid = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            const resultItemName = await getItemName(Number(itemid));
            setItemName(resultItemName.data);
        };
        fetchData();
    }, []);

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
                    <Typography
                        variant="h4"
                        display="flex"
                        justifyContent="center"
                    >
                        {itemName}
                    </Typography>
                </Grid2>
                <Grid2
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    marginTop={5}
                >
                    <ReviewForm />
                </Grid2>
            </Grid2>
        </MainLayout>
    );
};

export default AddReview;
