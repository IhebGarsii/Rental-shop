import React, { useState } from "react";
import "./login.css";
import { signin } from "../../apis/userApi";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../../components/loading/Loader";

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const mutation = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      dispatch(login(data));
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("image", data.user.image);
      localStorage.setItem("idUser", data.user._id);
      localStorage.setItem("roles", data.user.roles);
      navigate("/home");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(`Login failed: ${error.message || "Unknown error"}`);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="form-control">
        <p className="title">Login</p>
        <div className="input-field">
          <input
            required
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label" htmlFor="input">
            Enter Email
          </label>
        </div>
        <div className="input-field">
          <input
            required
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label" htmlFor="input">
            Enter Password
          </label>
        </div>
        <Link to="/forgotPassword">Forgot your password?</Link>

        <button disabled={isPending} className="submit-btn" type="submit">
          {isPending ? <Loader /> : <span> Submit</span>}
        </button>
      </form>
    </div>
  );
}

export default Login;
