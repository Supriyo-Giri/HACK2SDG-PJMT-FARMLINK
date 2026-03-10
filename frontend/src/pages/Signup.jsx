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
    // console.log(formData)

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/register`,
        formData,
      );
      // if (res.data.message) {
      //   toast.success("Signup successful!");
      // }
      // console.log(res.data)
      if (res.data.success) {
        toast.success(res.data.message);

        // redirect to email verification page
        setTimeout(() => {
          navigate("/verify");
        }, 1500);
      }
    } catch (error) {
      // toast.error(`Signup failed: ${error.response.data.message}`);
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

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
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="enthusiast">Plant Enthusiast</option>
            <option value="homeGrower">Home Grower</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
