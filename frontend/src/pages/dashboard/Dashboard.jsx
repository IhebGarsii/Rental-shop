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
      {/*  <form onSubmit={submitLetter}>
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
        </form> */}
      <div className="form-container">
        <form className="formm">
          <div className="form-group">
            <label for="email">Subject</label>
            <input type="text" id="email" name="email" required="" />
          </div>
          <div className="form-group">
            <label for="textarea">Type the body of the email</label>
            <textarea
              name="textarea"
              id="textarea"
              rows="10"
              cols="50"
              required=""
            >
              {" "}
            </textarea>
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
