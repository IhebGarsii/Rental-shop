import React, { useState } from "react";
import "./forgotPassword.css";
import { passwordReset } from "../../apis/userApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../../components/loading/Loader";
function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { mutate } = useMutation({
    mutationFn: passwordReset,
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error) => {
      toast.error("error in ressting password:", error);
    },
  });

  return (
    <div className="forgot-password">
      <div className="forgot-password-card">
        <span className="card__title">Password Reset</span>
        <p className="card__content">
          You will recive an email that have the new password
        </p>
        <div className="card__form">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            type="text"
            value={email}
          />
        
          <button
            disabled={isPending}
            onClick={() => mutate(email)}
            className="sign-up"
            type="submit"
          >
            {isPending ? <Loader /> : <span> Submit</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
