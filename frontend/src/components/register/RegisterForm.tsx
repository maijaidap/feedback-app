import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, FormLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUser } from "../../api/api";

const RegisterForm = (): JSX.Element => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function handleChangeUsername(e: any) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e: any) {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await createUser(username, password);
      console.log(response.data);

      // Reset form fields after successful submission
      setUsername("");
      setPassword("");
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
      <form id="Register-form" onSubmit={handleSubmit}>
        <Grid2 xs={12}>
          <FormLabel id="email_address">Username:</FormLabel>
          <TextField
            onChange={handleChangeUsername}
            aria-labelledby="email_address"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel id="password">Password:</FormLabel>
          <TextField
            onChange={handleChangePassword}
            aria-labelledby="password"
            size="small"
            fullWidth
          />
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
