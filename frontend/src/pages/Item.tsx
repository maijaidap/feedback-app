import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import MainLayout from "../components/main-layout/MainLayout";
import ReviewLine from "../components/review/ReviewLine";
import { getReviews } from "../api/api";
import { useEffect, useState } from "react";

interface Review {
  id: string;
  grade: string;
  review: string;
  date: string;
}

const Item = (): JSX.Element => {
  const [reviews, setitems] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getReviews();
      setitems(result);
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
          Item
        </Typography>
        <Button
          href="/add-review"
          type="submit"
          variant="contained"
          style={{ marginTop: 40, marginBottom: 30 }}
        >
          Add review
        </Button>
        {reviews.map((review) => (
          <ReviewLine key={review.id} review={review} />
        ))}
      </Grid2>
    </MainLayout>
  );
};

export default Item;
