import React, { useState } from "react";
import axios from "axios";
import Header from "../header/header2";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const date = new Date();
    const timeString = `${date.getHours()}:${date.getMinutes()}`;

    const userMessage = {
      text: inputText,
      time: timeString,
      sender: "user",
    };

    setMessages([...messages, userMessage]);
    setInputText("");

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/get", {
        msg: inputText,
      });

      const botMessage = {
        text: response.data.response,
        time: timeString,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error in chatbot request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-orange-100 h-[700px] p-4  shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex justify-between  items-center bg-orange-300 text-white p-4 rounded-t-lg">
          <div className="flex items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/017/018/non_2x/ecommerce-icon-free-png.png"
              alt="chatbot"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span>Dress Bot</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-white rounded-b-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" ? (
                <div className="flex items-start">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/016/017/018/non_2x/ecommerce-icon-free-png.png"
                    alt="bot"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs text-orange-300">{msg.time}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-end">
                  <div className="bg-orange-400 text-white p-2 rounded-lg shadow-md">
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs">{msg.time}</span>
                  </div>
                  <img
                    src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
                    alt="user"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 p-2 rounded-lg shadow-md">
                <p className="text-sm">...</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleFormSubmit} className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border rounded-l-lg focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-r-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <Header />
      <div className="h-screen">
        <Chatbot />
      </div>
    </>
  );
};

export default Contact;
