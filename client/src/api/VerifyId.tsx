import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
// import api from "./api";

export function VerifyId() {
  const location = useLocation();
  const { id } = useParams();
  console.log(id);

  const isValidId = false;

  if (!isValidId) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default { VerifyId };
