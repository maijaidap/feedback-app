import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, FormLabel, TextField } from "@mui/material";
import { useState } from "react";
import { login, setToken } from "../../api/api";
import { useNavigate } from "react-router-dom";

const LoginForm = (): JSX.Element => {
    const navigate = useNavigate();
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
            if (response.data.accessToken) {
                // If a valid access token is received in the response,
                // set the token in local storage and mark the user as authenticated
                setToken(response.data.accessToken);
                localStorage.setItem("isAuthenticated", "1");
                navigate("/home");
            } else {
                // If the response does not contain an access token,
                // display an alert indicating invalid username or password
                alert("Invalid username or password.");
            }
        } catch (error) {
            // If an error occurs during the login request,
            // display an alert indicating invalid username or password
            alert("Invalid username or password.");
        }
    };

    return (
        <Grid2
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
        >
            <form id="Login-form" onSubmit={handleSubmit}>
                <Grid2 xs={12}>
                    <FormLabel id="username">Username:</FormLabel>
                    <TextField
                        aria-labelledby="username"
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
                        type="password"
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
