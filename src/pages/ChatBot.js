import React, { useState, useEffect } from "react";
import axios from "axios";
import { data } from '../Constants';
import HeadingDisplay from './HeadingDisplay';
import "./ChatBot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // This function will be called when the component mounts
    sendMessage("Hello : You are a clever chatbot who knows indian politics");
  }, []);

  const sendMessage = async (message) => {
    setIsLoading(true);
    const message_temp = ` You are a chatbot : reply in english always : ${message}`;
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci/completions",
      
      {
        prompt: message_temp,
        max_tokens: 150,
        temperature: 0.7,
        n: 1,
        stop: "\n",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.OPENAI_API_KEY}`,
        },
      }
    );

    const botMessage = response.data.choices[0].text.trim();
    setMessages((prevMessages) => [...prevMessages, { text: botMessage, isBot: true }]);
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [...prevMessages, { text: inputText, isBot: false, isUser: true }]);
    sendMessage(inputText);
    setInputText("");
  };

  const ResetText = ()=>{
    setInputText("");
    setMessages([]);
  }
  
  return (
    <div className="chatbot">
      <HeadingDisplay title="ChatBot" />
      <div className="chatbot__messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot__message ${
              message.isBot ? "chatbot__message--bot" : message.isUser ? "chatbot__message--user" : ""
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && <div className="chatbot__loading">Loading...</div>}
      </div>
      <form className="chatbot__form" onSubmit={handleSubmit}>
        <input size="100" type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} /> &nbsp; &nbsp;
        <button className="btn btn-primary" type="submit">Send</button> &nbsp; &nbsp;
        <button className="btn btn-danger"  type="reset" onClick={ResetText}>Reset</button>
      </form>
    </div>
  );
};

export default Chatbot;
