import React, { useState } from "react";
import axios from "axios";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false); // State for showing typing indicator

  // Handle message form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!inputText.trim()) return; // Don't allow empty messages

    const date = new Date();
    const timeString = `${date.getHours()}:${date.getMinutes()}`;

    // User's message
    const userMessage = {
      text: inputText,
      time: timeString,
      sender: "user",
    };

    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input field
    setInputText("");

    // Show "bot is typing..." indicator
    setIsBotTyping(true);

    // Make the API call to get the bot's response
    try {
      const response = await axios.post(
        "http://localhost:5000/get", // Make sure this is the correct Flask API URL
        { msg: inputText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Bot's message
      const botMessage = {
        text: response.data.response, // Access the bot's response from the response data
        time: timeString,
        sender: "bot",
      };

      // Remove the typing indicator and add bot's response to the chat
      setIsBotTyping(false);
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error in chatbot request:", error);
      setIsBotTyping(false); // Remove typing indicator on error
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md h-[500px] flex flex-col">
        <div className="flex justify-between items-center p-4 bg-green-600 text-white rounded-t-lg">
          <div className="flex items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/017/018/non_2x/ecommerce-icon-free-png.png"
              alt="chatbot"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span> Bot</span>
          </div>
          <button onClick={onClose} className="text-white">
            &times;
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          {/* Render each message */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex items-start">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/016/017/018/non_2x/ecommerce-icon-free-png.png"
                    alt="bot"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                </div>
              )}

              {msg.sender === "user" && (
                <div className="flex items-end">
                  <div className="bg-green-500 text-white p-2 rounded-lg shadow-md">
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

          {/* Show typing indicator when the bot is typing */}
          {isBotTyping && (
            <div className="flex items-start mb-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/016/017/018/non_2x/ecommerce-icon-free-png.png"
                alt="bot"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="bg-gray-200 p-2 rounded-lg shadow-md">
                <p className="text-sm">Bot is typing...</p>
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
              className="bg-green-600 text-white px-4 py-2 rounded-r-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
