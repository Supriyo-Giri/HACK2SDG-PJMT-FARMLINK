import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verfiy";
import VerifyEmail from "./pages/VerifyEmail";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeaturedFertilizer from "./components/FeaturedFertilizer";
import Footer from "./components/Footer";
import GrowthTimeline from "./components/GrowthTimeline";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import Cart from "./pages/Cart"
import About from "./pages/About";

const App = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/auth/me",
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          withCredentials: true,
        },
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
      // 1. Call the backend logout API
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );

      // 2. Clear state immediately
      setUser(null);

      // 3. Clear localStorage if you're storing anything there
      localStorage.removeItem("user");

      // 4. Force a clean refresh to clear any lingering memory/auth state
      // window.location.assign() is cleaner than window.location.href
      window.location.assign("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optional: Add a toast notification here
    }
  };

  const isLoggedIn = !!user;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar
            isLoggedIn={isLoggedIn}
            user={user}
            handleLogout={handleLogout}
          />
          <Hero />
          <Features />
          <FeaturedFertilizer />
          <GrowthTimeline />
          <Footer />
        </>
      ),
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login setUser={setUser} />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/verify/:token",
      element: <VerifyEmail />,
    },
    {
      path: "/products",
      element: (
        <ProtectedRoute>
          <Navbar
            isLoggedIn={isLoggedIn}
            user={user}
            handleLogout={handleLogout}
          />
          <Products />
          <Footer />
        </ProtectedRoute>
      )
    },
    {
        path: "/cart",
        element: (
          <>
            <Navbar
            isLoggedIn={isLoggedIn}
            user={user}
            handleLogout={handleLogout}
            />
            <Cart />
            <Footer />
          </>
        )
    },{
      path: "/about",
      element:(
        <>
        <Navbar
            isLoggedIn={isLoggedIn}
            user={user}
            handleLogout={handleLogout}
            />
            <About />
            <Footer />
        </>
      )
    }
    // {
    //   path: "/orders",
    //   element: (
    //     <ProtectedRoute>
    //       <Navbar
    //         isLoggedIn={isLoggedIn}
    //         user={user}
    //         handleLogout={handleLogout}
    //       />
    //       <Orders />
    //       <Footer />
    //     </ProtectedRoute>
    //   ),
    // },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
