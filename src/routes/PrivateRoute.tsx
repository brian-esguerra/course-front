import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store";

function PrivateRoute({ children }) {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
