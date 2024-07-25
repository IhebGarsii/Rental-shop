import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
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
  }, [localStorage.getItem("idUser")]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const location = useLocation();

  const hasHomeInUrl = location.pathname.includes("home");
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
              HOME
            </Link>
            <Link to="Cars" onClick={toggleMenu}>
              CARS
            </Link>
            <Link to="userBooking" onClick={toggleMenu}>
              MY BOOKING
            </Link>
            <Link to="howToBook" onClick={toggleMenu}>
              HOW TO BOOK
            </Link>
            {localStorage.getItem("roles") === "ADMIN" && (
              <Link to="dashboard" onClick={toggleMenu}>
                DASHBOARD
              </Link>
            )}
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
            {hasHomeInUrl && (
              <a className="cta" href="#home-contact">
                <span>Contact Us &nbsp;</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </a>
            )}
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
