import Head from "next/head";
import { useState } from "react";
import Chat from "../components/Chat";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * This function handles the sending of user input message and receiving the AI response from openAI
   */
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { output } = data;

        const chat = {
          user: userInput,
          gpt: output.text,
        };

        setChat((prev) => [...prev, chat]);
        setIsGenerating(false);
      });
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            {/* Change your headline here */}
            <h1>Chat with me</h1>
          </div>
          <div className="header-subtitle">
            <h2>Input a message and GPT will respond to you</h2>
          </div>
        </div>

        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>

          <Chat chat={chat} />
        </div>
      </div>
    </div>
  );
};

export default Home;
