import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/carRentalLogo.jpg";
import Notification from "../notification/Notification.jsx";

function Navbar() {
  const navigate = useNavigate();
  const [logedIn, setLogedIn] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    setLogedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLogedIn(false);
    } else {
      setLogedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className={`navbar-container ${menuOpen ? "active" : ""}`}>
        <div className="navbar-header">
          <Link to="home" className="company-info">
            <img src={logo} alt="company logo" className="company-logo" />
            Rent a Bitch
          </Link>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <span>&#9776;</span>
          </div>
        </div>
        <div className="navbar-content">
          <nav className="links">
            <Link to="home" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="Cars" onClick={toggleMenu}>
              Cars
            </Link>
            <Link to="userBooking" onClick={toggleMenu}>
              My Bookink
            </Link>
            <Link to="howToBook" onClick={toggleMenu}>
              HOW TO BOOK
            </Link>
            <Link to="dashboard" onClick={toggleMenu}>
              dashboard
            </Link>
          </nav>
          <div className="auth">
            <Notification className="navbar-notification" />
            {logedIn && (
              <>
                <img
                  className="company-logo"
                  src={`http://localhost:4000/uploads/users/${localStorage.getItem(
                    "image"
                  )}`}
                  alt=""
                />
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            )}
            {!logedIn && (
              <>
                <Link to="login" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="signup" onClick={toggleMenu}>
                  Signup
                </Link>
              </>
            )}
            <a href="#home-contact">Contact Us</a>
          </div>
        </div>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
