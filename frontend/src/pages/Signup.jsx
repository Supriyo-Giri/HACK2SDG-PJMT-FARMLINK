import React, { useState } from "react";
import axios from "axios";
import "./css/Signup.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/register`,
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message || "Account created! Redirecting...");

        // The 1.5s delay allows the user to see the success toast
        setTimeout(() => {
          navigate("/verify");
        }, 1500);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Join the Green Side</h2>
        <p className="signup-sub">Get premium organic fertilizers delivered to your door.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">I am a...</option>
            <option value="farmer">Commercial Farmer</option>
            <option value="homeGrower">Home Gardener</option>
            <option value="enthusiast">Plant Enthusiast</option>
          </select>

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>
        
        <p className="login-prompt">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;