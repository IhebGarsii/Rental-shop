import React, { useState } from "react";
import "./dashboard.css";
import { postNewsLetter } from "../../apis/NewsLetterApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Dashboard() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const { mutate: mutatePost } = useMutation({
    mutationFn: postNewsLetter,
    onSuccess: () => {
      toast.success("The emails were Sent with success");
    },
    onError: (error) => {
      toast.error("there was an error in sending the emails", error);
    },
  });
  const submitLetter = async (e) => {
    e.preventDefault();
    try {
      const data = { subject, text };
      mutatePost(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="dashboard">
      <div className="form-container">
        <form onSubmit={submitLetter} className="formm">
          <h2>Send an Email For News Letter</h2>
          <div className="form-group">
            <label for="email">Subject</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setSubject(e.target.value)}
              required=""
            />
          </div>
          <div className="form-group">
            <label for="textarea">Type the body of the email</label>
            <textarea
              name="textarea"
              id="textarea"
              rows="10"
              cols="50"
              required=""
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <button className="form-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
