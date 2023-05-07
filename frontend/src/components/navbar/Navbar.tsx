import styles from "./Navbar.module.css";
import { IconButton, Link } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";
import { logout } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Navbar = (): JSX.Element => {
    const [isAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") ?? ""
    );

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Get the token from local storage
            let token = localStorage.getItem("token");

            if (token == null) token = "";
            const response = logout(token);
            console.log(response);

            // Clear the token from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/home">
                    <span>Feedback app</span>
                </Link>
            </div>
            <div className={styles.links}>
                {isAuthenticated ? (
                    <IconButton onClick={handleLogout}>
                        <LogoutIcon
                            style={{ color: "#f1faee" }}
                            fontSize="large"
                        />
                    </IconButton>
                ) : (
                    ""
                )}
                {!isAuthenticated ? (
                    <Link href="/login" style={{ color: "#f1faee" }}>
                        Login
                    </Link>
                ) : (
                    ""
                )}
            </div>
        </nav>
    );
};

export default Navbar;
