import React from "react";
import { Link ,Navigate } from "react-router-dom";

const Home = () => {
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  if (!loggedIn) {
    return <Navigate to="/login" replace={true} />
  }
  return (
    <>
      <div className="container mx-auto my-5">
        <div className="flex flex-wrap justify-around mx-4">
          <Link to={"/summary"}>
            <div className="hover:bg-secondary-focus card w-64 h-48 bg-secondary text-secondary-content border-solid border-2 border-primary my-2 cursor-pointer">
              <div className="card-body flex flex-col justify-center">
                <h2 className="card-title">Text Summry</h2>
                <p className="mt-2">
                  Summarize text like a human expert, paraphrasing.
                </p>
              </div>
            </div>
          </Link>{" "}
          <Link to={"/paragraph"}>
            <div className="hover:bg-secondary-focus card w-64 h-48 bg-secondary text-secondary-content border-solid border-2 border-primary my-2 cursor-pointer">
              <div className="card-body flex flex-col justify-center">
                <h2 className="card-title">Paragraph</h2>
                <p className="mt-2">
                  Generate complete paragraphs according to the instructions
                  provided by you.
                </p>
              </div>
            </div>
          </Link>{" "}
          <Link to={"/chatbot"}>
            <div className="hover:bg-secondary-focus card w-64 h-48 bg-secondary text-secondary-content border-solid border-2 border-primary my-2 cursor-pointer">
              <div className="card-body flex flex-col justify-center">
                <h2 className="card-title">Chat Bot</h2>
                <p className="mt-2">
                  Eva is software that simulates human-like conversations with
                  users via chat
                </p>
              </div>
            </div>
          </Link>{" "}
          <Link to={"/codehelper"}>
            <div className="hover:bg-secondary-focus card w-64 h-48 bg-secondary text-secondary-content border-solid border-2 border-primary my-2 cursor-pointer">
              <div className="card-body flex flex-col justify-center">
                <h2 className="card-title">Help with code !</h2>
                <p className="mt-2">
                  Eva can Generate Code To Help Programmers.
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/imagegen"}>
            <div className="hover:bg-secondary-focus card w-64 h-48 bg-secondary text-secondary-content border-solid border-2 border-primary my-2 cursor-pointer">
              <div className="card-body flex flex-col justify-center">
                <h2 className="card-title">Image Generator</h2>
                <p className="mt-2">
                  Enter your prompts and Eva convert text to image in different
                  art styles quickly, like magic-wand.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
