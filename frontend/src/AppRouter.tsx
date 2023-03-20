import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="login" element={<Login />}></Route>
      {/* TODO 
      <Route path="register" element={<Register />}></Route>
      */}
    </Routes>
  );
};

export default AppRouter;
