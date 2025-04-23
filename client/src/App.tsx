import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./api/RequireAuth";
import PublicRoute from "./api/PublicRoute";

const Login = React.lazy(() => import("./components/Login"));
const Profile = React.lazy(() => import("./components/Profile"));
const ForumLayout = React.lazy(() => import("./components/ForumLayout"));

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      {/* PRIVATE ROUTES */}
      <Route element={<RequireAuth />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<ForumLayout />} />
      </Route>
    </Routes>
  );
}

export default App;
