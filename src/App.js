import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import Modal from "./Modal";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("-");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    //setUsername(prompt("Please enter yout name"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  const handleName = (name) => {
    setUsername(name);
  };
  return (
    <div className="App">
      <Modal onWriteName={handleName} />
      <img
        style={{ height: 100, width: 100, marginTop: 10 }}
        src="https://cdn.iconscout.com/icon/free/png-512/messenger-37-1149873.png"
        alt=""
      />
      <h1 style={{ marginBottom: 2, fontWeight: 400, fontSize: 42 }}>
        The Best Messenger
      </h1>
      <h3
        style={{
          marginTop: 0,
          marginBottom: 10,
          fontWeight: 400,
          color: "gray",
        }}
      >
        Hi {username}
      </h3>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__Input"
            placeholder="Enter a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove className="flipMove">
        {messages.map(({ id, message }) => {
          return <Message key={id} username={username} message={message} />;
        })}
      </FlipMove>
      <div style={{ marginBottom: 100 }}>
        <h2>{messages.length > 10 && "The beginning of the conversation"}</h2>
      </div>
    </div>
  );
}

export default App;
