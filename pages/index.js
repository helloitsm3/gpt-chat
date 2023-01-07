import Head from "next/head";
import { useState } from "react";
import Chat from "../components/Chat";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

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
            <h1>magic blog post generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              input the title to your blog post below, we'll generate the rest.
            </h2>
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
