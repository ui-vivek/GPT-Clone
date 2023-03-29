import React, { useState } from "react";
import axios from "axios";
import {  Navigate } from "react-router-dom";


const Summary = () => {
  //media
  // states
  const [text, settext] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  if (!loggedIn) {
    return <Navigate to="/login" replace={true} />
  }
  //register ctrl
  const handleSubmit = async (e) => {
    setSummary("thinking...");
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/summary", { text });
      data ? setSummary("") : setSummary("Sorry i don't know this ...😑");
      let len = data.length;
      let i = 0;
      setInterval(() => {
        if (i === len) {
          return;
        }
        setSummary((pre) => [...pre, data[i]]);
        i++;
      }, 15);
    } catch (err) {
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <div style={{ position: "absolute", bottom: "20px", width: "80%" }}>
        <div className="chat chat-start">
          {summary ? (
            <div className="chat-bubble chat-bubble-primary">
              <p>{summary}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="chat chat-end">
          {text ? (
            <div className=" chat-bubble mb-2">
              {" "}
              <p>{text}</p>
            </div>
          ) : (
            ""
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="text"
            placeholder="type the paragraph to summarize..."
            className="input input-bordered input-primary w-full"
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
            required
          />
          <button className="btn btn-primary mx-2">
            <i className="bx bxs-send bx-sm"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Summary;
