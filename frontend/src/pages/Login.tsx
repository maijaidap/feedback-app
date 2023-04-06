import MainLayout from "../components/main-layout/MainLayout";
import LoginForm from "../components/login/LoginForm";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link, Typography } from "@mui/material";
import React from "react";

const Login = (): JSX.Element => {
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
            Login
          </Typography>
        </Grid2>
        <Grid2 xs={12}>
          <LoginForm />
        </Grid2>
        <div>
          <Link href="/register">Register</Link>
        </div>
      </Grid2>
    </MainLayout>
  );
};

export default Login;
