import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const Summary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/summary", { text });
      console.log(data);
      setSummary(data);
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
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      {summary ? (
        <>
          <div className="mockup-window border bg-base-300 ">
            <div className=" px-4 py-16 bg-base-200">
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-primary">
                  <p>{summary}</p>
                </div>
              </div>
              <div className="chat chat-end">
                <div className=" chat-bubble">
                  <p>{text}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} action="">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full max-w-xs"
                value={text}
                onChange={(e) => {
                  settext(e.target.value);
                }}
                multiline={true}
                required
                fullWidth
              />
              <button className="btn"><i class='bx bxs-send bx-sm'></i></button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="mockup-window border bg-base-300 ">
            <div className=" px-4 py-16 bg-base-200">
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-primary">
                  <p>{summary}</p>
                </div>
              </div>
              <div className="chat chat-end">
                <div className=" chat-bubble">
                  <p>{text}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} action="">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full max-w-xs"
                value={text}
                onChange={(e) => {
                  settext(e.target.value);
                }}
                multiline={true}
                required
                fullWidth
              />
              <button className="btn"><i class='bx bxs-send bx-sm'></i></button>
            </form>
          </div>
        </>
      )}
      {/* <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse> */}
    </div>
  );
};

export default Summary;
