import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import React from "react";

const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="home" element={<Home />}></Route>
      <Route index element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
