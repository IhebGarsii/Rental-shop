import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import toast from "react-hot-toast";
import { subscribeNewsLetter } from "../../apis/NewsLetterApi";

function Footer() {
  const [email, setEmail] = useState();
  const subscribe = async (e) => {
    e.preventDefault();
    try {
      email;
      console.log(email);
      await subscribeNewsLetter(email);
      toast.success("Subscription secceded");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="newsletter-form">
          <p className="heading"> Subscribe to Our Newsletter</p>
          <form onSubmit={subscribe} className="form">
            <label htmlFor="email">Email:</label>
            <input
              required=""
              placeholder="Enter your email address"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <input value="Subscribe" type="submit" />
          </form>
        </div>
        <div className="left-footer">
          <div className="footer-middle">
            <h3>something</h3>
            <Link>kink</Link>
            <Link>kink</Link>
            <Link>kink</Link>
            <Link>kink</Link>
            <Link>kink</Link>
            <Link>kink</Link>
          </div>
          <div className="footer-right">
            <h3>something</h3>

            <Link>kink</Link>
            <Link>kink</Link>
            <Link>kink</Link>
            <Link>kink</Link>
            <Link>kink</Link>
            <Link>kink</Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <hr />
      <div className="footer-bottom">all Right reserved</div>
    </div>
  );
}

export default Footer;
