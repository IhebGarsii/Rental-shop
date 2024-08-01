import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./sidebar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <Link to="addCar">Add a Car</Link>
        <Link to="">Rented Cars</Link>
        <Link to="bookingRequests">Pending Requests</Link>
        <Link to="">News Letter</Link>
        <Link to="users">Users</Link>
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <div className="sideBar-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default SideBar;
