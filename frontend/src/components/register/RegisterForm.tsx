import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, FormLabel, TextField } from "@mui/material";
import React from "react";

const RegisterForm = (): JSX.Element => {
  return (
    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
      <form id="Register-form">
        <Grid2 xs={12}>
          <FormLabel id="email_address">Username:</FormLabel>
          <TextField aria-labelledby="email_address" size="small" fullWidth />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel id="password">Password:</FormLabel>
          <TextField aria-labelledby="password" size="small" fullWidth />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel id="re-password">Re-enter password:</FormLabel>
          <TextField aria-labelledby="re-password" size="small" fullWidth />
        </Grid2>
        <Grid2 xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default RegisterForm;
