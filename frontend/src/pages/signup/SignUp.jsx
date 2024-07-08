import React, { useState } from "react";
import "./signup.css";
import { signup } from "../../apis/userApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
      }

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="signup">
      <form
        className="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <label htmlFor="firstName">Name</label>
        <input type="text" name="firstName" {...register("firstName")} />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" {...register("lastName")} />

        <label htmlFor="email">Email</label>
        <input type="email" placeholder="email" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input type="text" placeholder="password" {...register("password")} />

        <label htmlFor="cin">Cin</label>
        <input type="text" name="cin" />
        <label htmlFor="image">Profile photo</label>
        <input type="file" name="image" {...register("image")} />
        <label htmlFor="coverImage">Cover Image</label>
        <input type="file" name="coverImage" />

        <button type="submit">signup</button>
      </form>
    </div>
  );
}

export default SignUp;
