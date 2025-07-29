import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography, CircularProgress } from "@mui/material";
import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [chatError, setChatError] = useState("");

  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await axios.post(BASE_URL + "/users/login", { email, password });
      setToken(res.data.token);
    } catch (err) {
      setLoginError("Invalid credentials");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setChatError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/chat",
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChat((prev) => [
        ...prev,
        { user: message, bot: res.data.reply }
      ]);
      setMessage("");
    } catch (err) {
      setChatError("Failed to send message.");
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Paper elevation={3} className="p-8 w-full max-w-md">
          <Typography variant="h5" className="mb-4 text-center">Login to Chatbot</Typography>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
            />
            {loginError && <Typography color="error">{loginError}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Paper>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <Paper elevation={3} className="p-6 w-full max-w-lg">
        <Typography variant="h5" className="mb-4 text-center">AI Chatbot</Typography>
        <div className="h-80 overflow-y-auto bg-white rounded shadow mb-4 p-4">
          {chat.length === 0 && (
            <Typography color="textSecondary">Start the conversation!</Typography>
          )}
          {chat.map((entry, idx) => (
            <div key={idx} className="mb-2">
              <div className="text-right">
                <span className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1">{entry.user}</span>
              </div>
              <div className="text-left">
                <span className="inline-block bg-gray-100 text-gray-800 rounded px-2 py-1">{entry.bot}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <TextField
            label="Type your message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            fullWidth
            disabled={loading}
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading || !message}>
            {loading ? <CircularProgress size={24} /> : "Send"}
          </Button>
        </form>
        {chatError && <Typography color="error">{chatError}</Typography>}
        <Button
          className="mt-4"
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => { setToken(""); setChat([]); }}
        >
          Logout
        </Button>
      </Paper>
    </div>
  );
}

export default App;
