import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import ListRantel from "./pages/list-rental/ListRantel.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import AddCar from "./pages/addCar/AddCar.jsx";
import CarDetail from "./pages/carDetail/CarDetail.jsx";
import UpdateCar from "./pages/updateCar/UpdateCar.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import SideBar from "./components/sidebar/SideBar.jsx";
import Users from "./pages/dashboard/users/Users.jsx";
import BookingList from "./pages/dashboard/requests/BookingList.jsx";
import Footer from "./components/footer/Footer.jsx";
import UserBooking from "./pages/userBooking/UserBooking.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/authFunction/AuthFunction.jsx";
import HowToBook from "./pages/howToBook/HowToBook.jsx";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <h1>Page not found</h1>,
    children: [
      { path: "home", element: <Home /> },
      { path: "Cars", element: <ListRantel /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/howToBook",
        element: <HowToBook />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <SideBar />,
            children: [
              { path: "", element: <Dashboard /> },
              { path: "users", element: <Users /> },
              { path: "addCar", element: <AddCar /> },
              { path: "bookingRequests", element: <BookingList /> },
            ],
          },
        ],
      },
      {
        path: "userBooking",
        element: <UserBooking />,
      },
      {
        path: "car/:id",
        element: <CarDetail />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "update/:id",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <UpdateCar /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
