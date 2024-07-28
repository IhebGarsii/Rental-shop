import React, { useState } from "react";
import "./forgotPassword.css";
import { passwordReset } from "../../apis/userApi";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handlePassword = async () => {
    console.log(email);
    const response = await passwordReset(email);
    navigate("/login");
  };
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
          <button onClick={handlePassword} className="sign-up">
            Get Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
