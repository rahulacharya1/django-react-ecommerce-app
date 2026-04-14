import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = sessionStorage.getItem("token");
    const isStaff = sessionStorage.getItem("is_staff") === "true";
    return token && isStaff ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
