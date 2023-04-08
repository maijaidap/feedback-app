import MainLayout from "../components/main-layout/MainLayout";
import LoginForm from "../components/login/LoginForm";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUsers } from "../api/api";

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

const Login = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
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
