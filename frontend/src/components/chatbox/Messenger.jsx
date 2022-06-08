import ChatOnline from "./Online";
import Conversation from "./Conversation";
import Message from "./Message";
import { useState, useEffect, useRef } from "react";
import "./messenger.scss";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const socket = useRef(io("ws://localhost:5002"));
  const [newMessage, setNewMessage] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const user = JSON.parse(localStorage.getItem("userInf"));
  console.log(user._id);
  useEffect(() => {
    socket.current = io("ws://localhost:5002");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);
  console.log(socket);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/conversation/${user._id}`
        );
        console.log(res);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/message/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  console.log(currentChat);
  console.log(messages);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("http://localhost:5000/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chat__menu">
        <div className="chat__menu__wrapper">
          <input placeholder="Search..." className="chat__menu__Input" />
          {conversation.map((c) => {
            return (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat__box__messenger">
        <div className="chat__box__wrapper">
          <div className="chat__box__top">
            {currentChat ? (
              <>
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </>
            ) : (
              <span className="noConversationText">
                open a conversation to start a chat
              </span>
            )}
          </div>
          <div className="chat__box__bottom">
            <textarea
              className="chat__message__input"
              placeholder="write something..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button className="chat__submit__button" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="chat__online">
        <div className="chat__online__wrapper">
          <ChatOnline user={user} />
        </div>
      </div>
    </div>
  );
};
export default Messenger;
