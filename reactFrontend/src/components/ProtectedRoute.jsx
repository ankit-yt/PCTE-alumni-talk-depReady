import React, { useEffect, useState } from "react";
import { getMe } from "../api/auth.api";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user.slice";

function ProtectedRoute({ children }) {
    const dispatch = useDispatch()
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [progress, setprogress] = useState(0);
  const [statusText, setStatusText] = useState("Verifying access...");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      const interval = setInterval(() => {
        setprogress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 3 + 1;
        });
      });
      try {
        setLoading(true);
        const res = await getMe();
        if (res.status === 200) {
          setStatusText("Access verified ! Redirecting...");
          setprogress(100);
        dispatch(setUser(res.data))
          setTimeout(() => {
            setIsAuthorized(true);
          }, 1000);
        }
        clearInterval(interval);
      } catch (err) {
        console.error("Verification failed:", err);
        setStatusText("Unauthorized access detected");
        setprogress(100);
        toast.error("Unauthorized Access");
        setIsAuthorized(false);
      }
    };
    verifyUser();
  }, []);
  if (isAuthorized === null) {
    return <Loader progress={progress} statusText={statusText} />;
  }
  return isAuthorized ? children : <Navigate to={"/auth"} replace />;
}

export default ProtectedRoute;
