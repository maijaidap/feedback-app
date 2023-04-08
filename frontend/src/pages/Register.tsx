import MainLayout from "../components/main-layout/MainLayout";
import RegisterForm from "../components/register/RegisterForm";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const Register = (): JSX.Element => {
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
          <Typography variant="h4" display="flex" justifyContent="center">
            Register
          </Typography>
        </Grid2>
        <Grid2 xs={12}>
          <RegisterForm />
        </Grid2>
        <div>
          <Link href="/login">Already have an account? Log in here</Link>
        </div>
      </Grid2>
    </MainLayout>
  );
};

export default Register;
