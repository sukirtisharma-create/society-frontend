import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
    fetch(`${baseUrl}/api/auth/me`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) navigate("/");
      });
  }, []);
}
