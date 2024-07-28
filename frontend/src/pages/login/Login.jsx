import React, { useState } from "react";
import "./login.css";
import { signin } from "../../apis/userApi";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
      };
      const login1 = await signin(data);
      if (login1.ok) {
        dispatch(login({ login1 }));
        console.log("Login successful:", login1.ok);
        localStorage.setItem("token", login1.token);
        localStorage.setItem("image", login1.user.image);
        localStorage.setItem("idUser", login1.user._id);
        localStorage.setItem("roles", login1.user.roles);
        console.log("user redux", user);
        navigate("/home");
      } else {
        console.log("fail", login1.ok);
        console.error("Login failed:", login1.error || "Unknown error");
        toast.error(`Login failed: ${login1.error || "Unknown error"}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="form-control">
        <p className="title">Login</p>
        <div className="input-field">
          <input
            required=""
            className="input"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label" htmlFor="input">
            Enter Email
          </label>
        </div>
        <div className="input-field">
          <input
            required=""
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label" htmlFor="input">
            Enter Password
          </label>
        </div>
        <Link to="/forgotPassword">Forgot your password?</Link>
        <button className="submit-btn" onClick={onSubmit}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
