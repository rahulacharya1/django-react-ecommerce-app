import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import API from "../services/api";

const ProtectedRoute = () => {
    const username = sessionStorage.getItem("username");
    const isStaff = sessionStorage.getItem("is_staff") === "true";
    const [isChecking, setIsChecking] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const validateSession = async () => {
            if (!username || !isStaff) {
                if (isMounted) {
                    setIsAllowed(false);
                    setIsChecking(false);
                }
                return;
            }

            try {
                await API.get("profile/");
                if (isMounted) {
                    setIsAllowed(true);
                }
            } catch (error) {
                sessionStorage.clear();
                if (isMounted) {
                    setIsAllowed(false);
                }
            } finally {
                if (isMounted) {
                    setIsChecking(false);
                }
            }
        };

        validateSession();

        return () => {
            isMounted = false;
        };
    }, [isStaff, username]);

    if (isChecking) {
        return null;
    }

    return username && isStaff && isAllowed ? <Outlet /> : <Navigate to="/login" replace />;
};


export default ProtectedRoute;
