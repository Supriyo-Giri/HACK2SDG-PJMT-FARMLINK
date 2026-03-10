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

const App = () => {

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
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
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);

    } catch (error) {
      console.log(error);
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
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;