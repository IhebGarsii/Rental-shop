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
      const login1 = await signin(data);
      if (login1) {
        localStorage.setItem("token", login1.token);
        localStorage.setItem("image", login1.user.image);
        localStorage.setItem("idUser", login1.user._id);
        localStorage.setItem("roles", login1.user.roles);

        console.log(login1);
        navigate("/home");
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
