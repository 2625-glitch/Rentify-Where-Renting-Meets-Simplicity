import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/NotLoginFlow/LandingPage";

import Signup from "./components/NotLoginFlow/Signup";
import Login from "./components/NotLoginFlow/Login";

export const NoLoggedIn = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
