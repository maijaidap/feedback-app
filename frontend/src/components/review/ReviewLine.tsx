import { ListItem, Rating, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

interface Review {
    id: string;
    grade: string;
    review: string;
    date: string;
}

interface ListItemProps {
    review: Review;
}

const ReviewLine = ({ review }: ListItemProps) => {
    return (
        <>
            <Grid2
                container
                xs={4}
                display="flex"
                justifyContent="left"
                marginTop={2}
            >
                <Grid2>
                    <Rating
                        name="simple-controlled"
                        readOnly
                        value={Number(review.grade)}
                    />
                    <Typography variant="body2">{review.date}</Typography>
                </Grid2>
                <ListItem key="review" divider={true} disableGutters={true}>
                    <Typography variant="body1">{review.review}</Typography>
                </ListItem>
            </Grid2>
        </>
    );
};

export default ReviewLine;
