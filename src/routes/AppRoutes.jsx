import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Details from "../pages/Details/Details";
import FormPost from "../pages/FormPost/FormPost";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="details/:idPost" element={<Details />} />
          </Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="profile/:idProfile" element={<Profile />} />
          <Route path="formPost" element={<FormPost />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
