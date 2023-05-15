import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import React from "react";
import AddReview from "./pages/AddReview";
import Item from "./pages/Item";
import PrivateRoute from "./PrivateRoute";

const AppRouter = (): JSX.Element => {
    return (
        <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="/items/:itemid" element={<Item />}></Route>
            <Route index element={<Home />} />

            {/* Route for adding a review (protected by PrivateRoute) */}
            <Route
                path="/items/:itemid/add-review"
                element={
                    <PrivateRoute>
                        <AddReview />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default AppRouter;
