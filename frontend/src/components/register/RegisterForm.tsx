import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, FormLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = (): JSX.Element => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
      const response = await axios.post("/api/users", user);
      console.log(response.data);

      // Reset the form after successful submission
      setUser({ username: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
      <form id="Register-form">
        <Grid2 xs={12}>
          <FormLabel id="email_address">Username:</FormLabel>
          <TextField
            onChange={handleChange}
            aria-labelledby="email_address"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormLabel id="password">Password:</FormLabel>
          <TextField
            onChange={handleChange}
            aria-labelledby="password"
            size="small"
            fullWidth
          />
        </Grid2>
        <Grid2 xs={12}>
          <Button
            onSubmit={handleSubmit}
            type="submit"
            variant="contained"
            fullWidth
          >
            Register
          </Button>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default RegisterForm;
