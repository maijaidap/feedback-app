import { Button, Link } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";

const ItemInfo = (): JSX.Element => {
  return (
    <Grid2
      container
      spacing={1}
      alignItems="center"
      justifyContent="center"
      marginTop={5}
    >
      <Button href="/add-review" type="submit" variant="contained">
        Add review
      </Button>
    </Grid2>
  );
};

export default ItemInfo;
