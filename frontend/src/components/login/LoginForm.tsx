import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, FormLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { login } from "../../api/api";

const LoginForm = (): JSX.Element => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function handleChangeUsername(e: any) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e: any) {
    setPassword(e.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await login(username, password);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
      <form id="Login-form" onSubmit={handleSubmit}>
        <Grid2 xs={12}>
          <FormLabel id="email_address">Username:</FormLabel>
          <TextField
            aria-labelledby="email_address"
            size="small"
            fullWidth
            onChange={handleChangeUsername}
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel id="password">Password:</FormLabel>
          <TextField
            aria-labelledby="password"
            size="small"
            fullWidth
            onChange={handleChangePassword}
          />
        </Grid2>
        <Grid2 xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default LoginForm;
