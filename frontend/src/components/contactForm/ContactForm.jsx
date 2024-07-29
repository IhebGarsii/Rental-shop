import React, { useState } from "react";
import "./contactForm.css";
import { sendEmail } from "../../apis/userApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const submitForm = async (e) => {
    e.preventDefault();

    const data = { email, body, subject };
    mutateContact(data);
  };
  const { mutate: mutateContact } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      toast.success("Email sent");
    },
    onError: (error) => {
      toast.error("sending email faild", error);
    },
  });
  return (
    <div className="contact-form">
      <div className="contact-left">
        <form className="form" onSubmit={submitForm}>
          <div className="title">Contact us</div>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="input"
          />
          <input
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
            className="input"
          />
          <textarea
            onChange={(e) => setBody(e.target.value)}
            placeholder="Your message"
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="contact-right">
        <img
          src="https://horizon-data.tn/wp-content/uploads/2020/05/contact-img.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default ContactForm;
