import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./sidebar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <Link to="addCar">Add a Car</Link>
        <Link to="">Rented Cars</Link>
        <Link to="">Pending Requests</Link>
        <Link to="">Profile</Link>
        <Link to="users">Users</Link>
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default SideBar;
