import { ListItem, Rating, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";

const ReviewLine = (): JSX.Element => {
  return (
    <>
      <Grid2 container xs={4} display="flex" justifyContent="left">
        <Grid2>
          <Rating name="simple-controlled" readOnly value={4} />
          <Typography variant="body2">1.2.2023</Typography>
        </Grid2>
        <ListItem key="review" divider={true} disableGutters={true}>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </ListItem>
      </Grid2>
    </>
  );
};

export default ReviewLine;
