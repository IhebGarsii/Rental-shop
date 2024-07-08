import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/carRentalLogo.jpg";

function Navbar() {
  const navigate = useNavigate();
  const [logedIn, setLogedIn] = useState();

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
  });

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="home" className="company-info">
          <img src={logo} alt="company logo" className="company-logo" />
          Rent a Bitch
        </Link>
        <nav className="links">
          <Link to="home">Home</Link>
          <Link to="Cars">Cars</Link>
          <Link to="MyBookink">My Bookink</Link>
          <Link to="dashboard">dashboard</Link>
        </nav>
        <div className="auth">
          {logedIn && (
            <img
              className="company-logo"
              src={`http://localhost:4000/uploads/users/${localStorage.getItem(
                "image"
              )}`}
              alt=""
            />
          )}

          {!logedIn && <Link to="login">Login</Link>}
          {!logedIn && <Link to="signup">Signup</Link>}

          {logedIn && <button onClick={logout}>Logout</button>}
        </div>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
