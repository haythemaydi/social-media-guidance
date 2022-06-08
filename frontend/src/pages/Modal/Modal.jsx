import React, { useState } from "react";
import "./modal.css";
import axios from "axios";
//axios.defaults.withCredentials = true;

function Modal({ setOpenModal, user }) {
  const [data, setData] = useState({
    date: "",
    time: "",
    address: "",
    description: "",
    image: "",
    user: user._id,
  });
  const { date, time, address, description, image } = data;
  const handleChange = ({ currentTarget: input }) => {
    const details = { ...data };
    details[input.name] = input.value;
    setData(details);
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/blog/add", {
        date: date,
        time: time,
        address: address,
        description: description,
        image: image,
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
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <form className="title" onSubmit={handleSubmit}>
          <input
            type="text"
            value={date}
            name="date"
            placeholder="date"
            onChange={handleChange}
          />
          <input
            type="text"
            value={time}
            name="time"
            placeholder="time"
            onChange={handleChange}
          />
          <input
            type="text"
            value={address}
            name="address"
            placeholder="address"
            onChange={handleChange}
          />
          <input
            type="text"
            value={description}
            name="description"
            placeholder="description"
            onChange={handleChange}
          />
          <input
            type="text"
            value={image}
            name="image"
            placeholder="imageUrl"
            onChange={handleChange}
          />

          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
          </div>
          <button type="submit">post</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
