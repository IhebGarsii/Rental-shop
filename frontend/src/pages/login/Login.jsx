import React, { useState } from "react";
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
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">login</button>
    </form>
  );
}

export default Login;
