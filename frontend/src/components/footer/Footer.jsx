import React from "react";
import "./footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-left newsletter-form">
        <p className="heading"> Subscribe to Our Newsletter</p>
        <form className="form">
          <label for="email">Email:</label>
          <input
            required=""
            placeholder="Enter your email address"
            name="email"
            id="email"
            type="email"
          />
          <input value="Subscribe" type="submit" />
        </form>
      </div>
      <div className="footer-middle"></div>
      <div className="footer-right"></div>
    </div>
  );
}

export default Footer;
