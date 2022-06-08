import React, { useState } from "react";
import "./Modal/modal.css";
import axios from "axios";
//axios.defaults.withCredentials = true;

function PostModal({ setOpen, user }) {
  const [data, setData] = useState({
    post: "",
    user: user._id,
  });
  const { post } = data;
  const handleChange = ({ currentTarget: input }) => {
    const details = { ...data };
    details[input.name] = input.value;
    setData(details);
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/post/create", {
        post: post,
        user: user._id,

        //withCredentials: true,
      })
      .catch((err) => console.log("error in the send request", err));
    const data = res.data;
    console.log("sendrequestdata", data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest((data) => console.log("event data send req", data));
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </button>
        </div>
        <form className="title" onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={post}
            name="post"
            placeholder="post"
            onChange={handleChange}
          />

          <button type="submit">post</button>
        </form>
      </div>
    </div>
  );
}

export default PostModal;
