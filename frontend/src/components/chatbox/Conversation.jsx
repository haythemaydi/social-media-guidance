import "./conversation.scss";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log(friendId);

    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/${friendId}`, {
          withCredential: true,
        });
        console.log(res.data);
        setUser(res.data.user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);
  return (
    <div className="conversation">
      <img src={user ? user.selectedFile : ""} alt="" />
      <span className="conversation__name">{user ? user.username : ""}</span>
    </div>
  );
};
export default Conversation;
