import React, { useState } from "react";
import "./dashboard.css";
import { postNewsLetter } from "../../apis/NewsLetterApi";

function Dashboard() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const submitLetter = async (e) => {
    e.preventDefault();
    try {
      const data = { subject, text };
      const letter = await postNewsLetter(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="dashboard">
      <div className="sidebar-container">
        <form onSubmit={submitLetter}>
          <input
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            onChange={(e) => setText(e.target.value)}
            name=""
            id=""
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
