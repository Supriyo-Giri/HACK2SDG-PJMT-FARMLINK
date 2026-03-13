import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast"; // New Toast system

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verfiy";
import VerifyEmail from "./pages/VerifyEmail";
import FeaturedFertilizer from "./components/FeaturedFertilizer";
import Footer from "./components/Footer";
import GrowthTimeline from "./components/GrowthTimeline";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";

const App = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("user");
      window.location.assign("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isLoggedIn = !!user;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
          <Hero />
          <Features />
          <FeaturedFertilizer />
          <GrowthTimeline />
          <Footer />
        </>
      ),
    },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login setUser={setUser} /> },
    { path: "/verify", element: <Verify /> },
    { path: "/verify/:token", element: <VerifyEmail /> },
    {
      path: "/products",
      element: (
        <ProtectedRoute>
          <Navbar isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
          <Products />
          <Footer />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
          <Cart />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
          <About />
          <Footer />
        </>
      ),
    },
  ]);

  return (
    <>
      {/* Global Toast Provider */}
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;