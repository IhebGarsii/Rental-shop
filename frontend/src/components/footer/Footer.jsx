import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import toast from "react-hot-toast";
import { subscribeNewsLetter } from "../../apis/NewsLetterApi";
import { useMutation } from "@tanstack/react-query";

function Footer() {
  const [email, setEmail] = useState("");
  const { mutate: mutateSubscribe } = useMutation({
    mutationFn: subscribeNewsLetter,
    onSuccess: () => {
      toast.success("Subscription succeeded");
    },
    onError: (error) => {
      toast.error("Subscription failed");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (email) {
      mutateSubscribe(email);
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="newsletter-form">
          <p className="heading">Subscribe to Our Newsletter</p>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email">Email:</label>
            <input
              required
              placeholder="Enter your email address"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email" // Use type="email" for better validation
            />
            <input value="Subscribe" type="submit" />
          </form>
        </div>
        <div className="left-footer">
          <div className="footer-middle">
            <h3>something</h3>
            <Link>link</Link>
            <Link>link</Link>
            <Link>link</Link>
            <Link>link</Link>
            <Link>link</Link>
            <Link>link</Link>
          </div>
          <div className="footer-right">
            <h3>something</h3>
            <Link>link</Link>
            <Link>link</Link>
            <Link>link</Link>
            <Link>link</Link>
            <Link>link</Link>
            <Link>link</Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <hr />
      <div className="footer-bottom">All rights reserved</div>
    </div>
  );
}

export default Footer;
