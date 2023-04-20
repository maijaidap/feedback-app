import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, FormLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { register } from "../../api/api";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";

const RegisterForm = (): JSX.Element => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false) // uppercase letter
  const [containsN, setContainsN] = useState(false) // number
  const [containsSC, setContainsSC] = useState(false) // special character
  const [contains8C, setContains8C] = useState(false) // min 8 characters
  
  const [allValid, setAllValid] = useState(false)


  function validatePassword(e: any) {
    // has uppercase letter
    if (password.toLowerCase()) setContainsUL(true)
    else setContainsUL(false)

    // has number
    if (/\d/.test(password)) setContainsN(true)
    else setContainsN(false)

    // has special character
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)) setContainsSC(true)
    else setContainsSC(false)

    // has 8 characters
    if (password.length >= 8) setContains8C(true)
    else setContains8C(false)

    // all validations passed
    if (containsUL && containsN && containsSC && contains8C) setAllValid(true)
    else setAllValid(false)
  }

  function handleChangeUsername(e: any) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e: any) {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await register(username, password);
      console.log(response.data);

      // Reset form fields after successful submission
      setUsername("");
      setPassword("");
      e.target.reset();
      navigate("/login");
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
            onKeyUp={validatePassword}
            aria-labelledby="password"
            type="password"
            size="small"
            fullWidth
          />
        </Grid2>
        <PasswordChecklist
            rules = {["capital", "specialChar", "minLength", "number"]}
            minLength = {8}
            value = {password}
         />
        <Grid2 xs={12} marginTop={2}>
          <Button id="register" type="submit" variant="contained" fullWidth disabled={!allValid}>
            Register
          </Button>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default RegisterForm;
