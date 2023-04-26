import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import React from "react";
import AddReview from "./pages/AddReview";
import Item from "./pages/Item";
import PrivateRoute from "./PrivateRoute";

const AppRouter = (): JSX.Element => {
    const [isAuthenticated] = React.useState(
        localStorage.getItem("isAuthenticated") ?? ""
    );
    return (
        <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="home" element={<Home />}></Route>
            {isAuthenticated ? (
                <Route
                    path="/items/:itemid/add-review"
                    element={<AddReview />}
                />
            ) : (
                ""
            )}
            <Route
                path="/items/:itemid/add-review"
                element={
                    <PrivateRoute>
                        <AddReview />
                    </PrivateRoute>
                }
            />
            <Route path="/items/:itemid" element={<Item />}></Route>
            <Route index element={<Home />} />
        </Routes>
    );
};

export default AppRouter;
