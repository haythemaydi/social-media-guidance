import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { authAction } from "../../app/store";
import { BsCircle, BsCalendarEvent } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineExclamationCircle } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import { getEvents, getPrivat } from "../../services/fakeservices";

import PostModal from "../PostModal";
import Modal from "../Modal/Modal";

import "./newcomerHome.scss";
import PrivateHome from "../privateHome/PrivateHome";

const NewcomerHome = ({ user, users }) => {
  const [search, setSearch] = useState("");
  const [field, setField] = useState("");
  const [category, setCategory] = useState("coach");
  const [events, setEvent] = useState(getEvents());
  const [privats, setPrivat] = useState(getPrivat());
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState();
  const [active, setActive] = useState(false);
  const [interest, setInterest] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
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

  const sendInterstedRequset = async (id) => {
    const res = await axios
      .put("http://localhost:5000/blog/interested", {
        blogId: id,
        user: user._id,
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendInterstedRequset();
    setInterest(true);
  }, [interest]);
  const sendNotInterstedRequset = async (id) => {
    const res = await axios
      .put("http://localhost:5000/blog/notInterested", {
        blogId: id,
        user: user._id,
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  let Count = 0;
  if (blogs) {
    //const blogInterested = blogs.filter((item) => item.Interested.length > 0);
    //   Count = blogInterested.length;
    if (user) {
      for (let i = 0; i < blogs.length; i++) {
        Count = blogs.filter((blog) =>
          blog.interested.includes(user._id)
        ).length;
        console.log("count", Count);
      }
    }
  }
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
  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const categoryHandler = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };
  const fieldHandler = (e) => {
    setField(e.target.value);
  };

  return (
    <div>
      <div className="newcomerPage-container">
        <div className="grid__container grid__4x2">
          <div className="newcomer-profile-box">
            <div className="logout-bnt">
              <button className="btn btn__logout" onClick={handleLogout}>
                Log out
              </button>
            </div>
            <div className="guidance-logo">
              <h3>Guidance</h3>
            </div>
            <div className="newcomer-profile">
              <div className="newComer__profile__image">
                <img src={user.selectedFile} alt="" />
              </div>
              <div className="flex-column">
                <div className="newComer__profile__name">
                  <p>{user.username}</p>
                </div>
                <div className="newComer__profile_status">
                  <p>{user.selectedRole}</p>
                </div>
                <div className="newComer__city">
                  <p>Berlin</p>
                </div>
              </div>
            </div>
            <div className="profile__functionalties">
              <div className="newcomer-messages add__style">
                <p onClick={() => history("/chat")}>Messages</p>
                <span>
                  <TiMessages color="#fff" size={20} />
                </span>
              </div>
              <div className="newcomer-posts add__style">
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  post
                </button>
                {open && <PostModal setOpen={setOpen} user={user} />}
                <span>
                  <AiOutlineEdit color="#fff" size={20} />
                </span>
              </div>
              <div className="newcomer-events add__style">
                <button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  createEvent
                </button>
                {modalOpen && <Modal setModalOpen={setModalOpen} user={user} />}
                <span>
                  <BsCalendarEvent color="#fff" size={20} />
                </span>
              </div>
              <div className="newcomer-events add__style">
                <p>Interested in</p>
                <span>{Count}</span>
              </div>
            </div>
          </div>
          <div className="search__box">
            <input
              className="search"
              type="search"
              placeholder="search..."
              onChange={searchHandler}
            />
            <select name="" id="" value={field} onChange={fieldHandler}>
              <option value="">Fields...</option>
              <option value="Bürgeramt ">Citizen's Offices</option>
              <option value="kitas">Kitas</option>
              <option value="students">Students</option>
              <option value="workers">Workers</option>
              <option value="immigration">Immigration</option>
              <option value="events">administration</option>
              <option value="events">events</option>
            </select>
            <select name="" id="" onChange={categoryHandler} value={category}>
              <option value="coach">Caochs</option>
              <option value="coach">Private</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          <div className="suggestions__box">
            <div className="suggestions__header">
              <div className="suggestion__title">
                <h3>Some Usefull Links</h3>
              </div>
              <div className="suggestion__list">
                <ul className="suggestion__menu">
                  <li>
                    <GiConfirmed size={25} />
                    <a href="https://service.berlin.de/">
                      How to get an appointement with Citzens Offices and read
                      more aboutother services.
                    </a>
                  </li>
                  <li>
                    <GiConfirmed size={25} />
                    <a
                      href="https://service.berlin.de/"
                      rel="noreferrer noopener"
                    >
                      How to get an appointement with Citzens Offices and read
                      more aboutother services.
                    </a>
                  </li>
                  <li>
                    <GiConfirmed size={25} />
                    <a
                      href="https://service.berlin.de/"
                      rel="noreferrer noopener"
                    >
                      How to get an appointement with Citzens Offices and read
                      more aboutother services.
                    </a>
                  </li>
                  <li>
                    <GiConfirmed size={25} />
                    <a
                      href="https://service.berlin.de/"
                      rel="noreferrer noopener"
                    >
                      How to get an appointement with Citzens Offices and read
                      more aboutother services.
                    </a>
                  </li>
                  <li>
                    <GiConfirmed size={25} />
                    <a
                      href="https://service.berlin.de/"
                      rel="noreferrer noopener"
                    >
                      How to get an appointement with Citzens Offices and read
                      more aboutother services.
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="chat__box">
            {blogs &&
              blogs.map((blog, index) => {
                if (user) {
                  if (interest) {
                    if (blog.interested.includes(user._id)) {
                      return <p>{blog.description}</p>;
                    } else {
                      return null;
                    }
                  }
                }
              })}
          </div>
          <div className="newcomer__aside">
            <div className="newcomer__aside__container">
              <div className="newcomer__events__card">
                {blogs &&
                  blogs.map((blogs, index) => (
                    <div className="event__container" key={index}>
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
                        <button
                          className={active ? "toggle" : null}
                          onClick={() => {
                            sendInterstedRequset(blogs._id);
                          }}
                        >
                          Interested
                        </button>
                        <button
                          onClick={() => {
                            sendNotInterstedRequset(blogs._id);
                          }}
                        >
                          Not Interested
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="privat__card">
                {users &&
                  users
                    .filter(
                      (user) => user.selectedRole === category /*&&
                        user.description.includes(field)*/
                    )
                    .map((privat) => (
                      <div
                        className="privat__card__container privat-block"
                        key={privat.key}
                      >
                        <div className="privat__card__content">
                          <div className="privat__flex">
                            <div className="privat__image">
                              <img src={privat.selectedFile} alt="" />
                            </div>
                            <div className="privat__info">
                              <p>{privat.username}</p>
                              <p>{privat.selectedRole}</p>
                            </div>
                          </div>
                          <div className="privat__date">
                            <p>{privat.createdAt} </p>
                          </div>
                        </div>

                        <div className="privat__moreInfo">
                          <div className="status">
                            <p>Status</p>
                            <span>online</span>
                          </div>
                          <div className="city">
                            <p>city</p>
                            <span>berlin</span>
                          </div>
                          <div className="country">
                            <p>country</p>
                            <span>germany</span>
                          </div>
                        </div>

                        <div className="privat__bio">
                          <div className="btn btn-privat">
                            <button
                              className="btn-secondary"
                              onClick={() => handleConversation(privat._id)}
                            >
                              Contact
                            </button>
                          </div>

                          <div className="privat__textarea">
                            <textarea
                              className="resize__textarea"
                              name=""
                              id=""
                              cols="45"
                              rows="5"
                            >
                              "Hallo every one! I am new in Berlin. I Can help
                              you to fill out anmeldung formular of Bürgeramt
                              for 10 eurs"
                            </textarea>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewcomerHome;
