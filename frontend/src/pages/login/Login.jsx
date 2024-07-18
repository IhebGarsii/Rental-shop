import React, { useState } from "react";
import "./login.css";
import { signin } from "../../apis/userApi";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
      };
      const login = await signin(data);
      if (login) {
        localStorage.setItem("token", login.token);
        localStorage.setItem("image", login.user.image);
        localStorage.setItem("idUser", login.user._id);
        localStorage.setItem("roles", login.roles);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      {/*  <form onSubmit={onSubmit}>
        <div className="login-input-container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input-container">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> */}
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
          <input required="" className="input" type="password" />
          <label
            className="label"
            htmlFor="input"
            onChange={(e) => setPassword(e.target.value)}
          >
            Enter Password
          </label>
        </div>
        <a>Forgot your password?</a>
        <button className="submit-btn" onClick={onSubmit}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
