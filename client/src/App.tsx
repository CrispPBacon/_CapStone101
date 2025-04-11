import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import React, { Suspense } from "react";
import ProtectedRoute from "./api/ProtectedRoute";
import Cookies from "universal-cookie";

const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Approval = React.lazy(() => import("./components/Approval"));
const Expense = React.lazy(() => import("./components/expense/Expense"));
const ExpenseForm = React.lazy(
  () => import("./components/expense/ExpenseForm")
);
const Login = React.lazy(() => import("./components/auth/Login"));
const Register = React.lazy(() => import("./components/auth/Register"));
const Team = React.lazy(() => import("./components/team/Team"));
const TeamForm = React.lazy(() => import("./components/team/TeamForm"));
const TeamJoin = React.lazy(() => import("./components/team/TeamJoin"));

const cookies = new Cookies();

function App() {
  const location = useLocation();

  const routes = [
    { path: "/dashboard/:id", element: <Dashboard /> },
    { path: "/expense/:id", element: <Expense /> },
    { path: "/approval/:id", element: <Approval /> },
  ];

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            !cookies.get("TOKEN") ? (
              <Suspense fallback={<h1>Loading...</h1>}>
                <Login />
              </Suspense>
            ) : (
              <Navigate to={"/"} state={{ from: location }} replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !cookies.get("TOKEN") ? (
              <Suspense fallback={<h1>Loading...</h1>}>
                <Register />
              </Suspense>
            ) : (
              <Navigate to={"/"} state={{ from: location }} replace />
            )
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Team />} />
          <Route path="/team/:id" element={<TeamJoin />} />
          <Route path="/new/team" element={<TeamForm />} />
          <Route path="/new/expense/:id" element={<ExpenseForm />} />
          <Route element={<ProtectedLayout />}>
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}

            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

function ProtectedLayout() {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
