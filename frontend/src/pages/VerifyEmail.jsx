import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(
          // "http://localhost:5000/api/auth/verify",
          `${import.meta.env.VITE_API_URL}/api/auth/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (error) {
        const message =
          error?.response?.data?.message || "Verification failed";
          navigate("/");
        toast.error(message);
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return <h2 style={{ textAlign: "center" }}>Verifying your email...</h2>;
};

export default VerifyEmail;