import React from "react";
import "./signup.css";
import { signup } from "../../apis/userApi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("cin", data.cin);
    formData.append("coverImage", data.coverImage);
    formData.append("image", data.image[0]);

    try {
      const login = await signup(formData);
      if (login) {
        localStorage.setItem("token", login.token);
        localStorage.setItem("image", login.user.image);
        localStorage.setItem("idUser", login.user._id);
        localStorage.setItem("roles", login.user.roles);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <label>
            <input
              {...register("firstName")}
              required
              type="text"
              className="input"
              placeholder=" "
            />
            <span>Firstname</span>
          </label>
          <label>
            <input
              {...register("lastName")}
              required
              type="text"
              className="input"
              placeholder=" "
            />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input
            {...register("email")}
            required
            type="email"
            className="input"
            placeholder=" "
          />
          <span>Email</span>
        </label>
        <label>
          <input
            {...register("password")}
            required
            type="password"
            className="input"
            placeholder=" "
          />
          <span>Password</span>
        </label>
        <label>
          <input required type="password" className="input" placeholder=" " />
          <span>Confirm password</span>
        </label>
        <label>
          <input
            {...register("image")}
            required
            type="file"
            className="input"
            placeholder=" "
          />
          <span>Image</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an account? <Link to="/login">Signin</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
