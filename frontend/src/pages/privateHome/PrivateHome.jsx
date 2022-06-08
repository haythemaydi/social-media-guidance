import { BsCircle, BsCalendarEvent } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { authAction } from "../../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getNewComers } from "../../services/fakeservices";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import "./privateHome.scss";

const PrivateHome = (props) => {
  const [newComers, setNewcomers] = useState(getNewComers());
  const [count, setCount] = useState(0);
  const [blogs, setBlogs] = useState();
  const [posts, setPost] = useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const isLogged = useSelector((state) => state.isLogged);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("unable to logout");
  };
  const handleLogout = () => {
    sendLogoutReq()
      .then(dispatch(authAction.logout()))
      .then(() => history("/"));
  };
  const GetRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/blog/blogs", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    GetRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  const handleCount = (e) => {
    setCount((count) => count + 1);
  };
  const GetPost = async () => {
    const res = await axios
      .get("http://localhost:5000/post/getPost", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    GetPost().then((data) => setPost(data.posts));
  }, []);
  console.log(posts);

  let user = props.user;
  let users = props.users;

  console.log(newComers);
  const postConversation = async (userId) => {
    const res = await axios
      .post("http://localhost:5000/conversation", {
        senderId: user._id,
        receiverId: userId,
      })
      .catch((error) => console.log(error));
    const data = await res.data;
    return data;
  };
  const handleConversation = (userId) => {
    postConversation(userId)
      .then((data) => console.log(data))
      .then(history("/chat"));
  };

  return (
    <div className="privatePage-container">
      <div className="grid__container grid__2x3">
        <div className="pofile-box">
          <div className="logout-bnt">
            <button className="btn btn__logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
          <div className="guidance-logo">
            <h3>Guidance</h3>
          </div>
          <div className="profile-info">
            <div className="line-dec"></div>
            <div className="profile-image">
              <img src={user.selectedFile} alt="" />
            </div>
            <div className="flex-position">
              <div className="profile-status">
                <p>{user.username}</p>
                <p>{user.selectedRole}</p>
              </div>
              <div className="creation-date">
                <p> joined{user.createdAt}</p>
              </div>
            </div>
          </div>
          <div className="profile-status-box">
            <div className="status">
              <span>Status</span>
              Online
            </div>
            <div className="location">
              <span>City</span> Berlin
            </div>
            <div className="country">
              <span>Country</span> Germany
            </div>
          </div>
          <div className="profile-bio">
            <textarea
              className="profile__textarea"
              name="bio"
              id=""
              cols="30"
              rows="5"
            >
              Where I can help...
            </textarea>
          </div>
        </div>
        <div className="notefication-container">
          <div className="messages__ntf">
            <p onClick={() => history("/chat")}>Messages</p>
            <span className="absolute-position">
              <BsCircle size={20} color="#F47060" />
            </span>
          </div>
          <div className="post__ntf">
            <p>Post</p>
            <span>
              <RiShareForwardLine size={20} />
            </span>
          </div>
          <div className="editProfile__ntf">
            <p>Edit Profile</p>
            <span>
              <AiOutlineEdit size={20} />
            </span>
          </div>
          <div className="createEvent__ntf">
            <p>Create Event</p>
            <span>
              <BsCalendarEvent size={20} />
            </span>
          </div>
        </div>
        <div className="chat-box">
          <div className="chatBox__list">hier is box chat</div>
        </div>

        <div className="aside aside__profiles">
          {posts &&
            posts.map((comer) => (
              <div className="comer-container" key={comer._id}>
                <div className="newComer-profile">
                  <div className="newComer-foto">
                    <img src={comer.user.selectedFile} alt="" />
                    <div className="column-flex">
                      <p>{comer.user.username}</p>
                      <p>{comer.user.selectedRole}</p>
                      <p>Berlin</p>
                    </div>
                  </div>

                  <div className="newComer-text">
                    <p>{comer.post}</p>
                  </div>
                </div>
                <div className="btn btn-profile">
                  <button onClick={() => handleConversation(comer.user._id)}>
                    Contact
                  </button>
                  <button>I can't help</button>
                </div>
              </div>
            ))}
          {blogs &&
            blogs.map((blogs) => (
              <div className="event__container" key={blogs._id}>
                <div className="event__content">
                  <div className="event__image">
                    <img src={blogs.image} alt="" />
                  </div>
                  <div className="event__header">
                    <h3>Event</h3>
                  </div>
                  <div className="event__menu">
                    <div className="event event__date">
                      <h4>Date:</h4>
                      <span>{blogs.date}</span>
                    </div>
                    <div className="event event__date">
                      <h4>Time:</h4>
                      <span>{blogs.time}</span>
                    </div>
                    <div className="event event__address">
                      <h4>Address:</h4>
                      <span>{blogs.address}</span>
                    </div>
                    <div className="event event__description">
                      <h4>Description: </h4>
                      <span>{blogs.description}</span>
                    </div>
                  </div>
                </div>
                <div className="btn btn-profile">
                  <button onClick={handleCount}>Interested</button>
                  <button>Not Interested</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PrivateHome;
