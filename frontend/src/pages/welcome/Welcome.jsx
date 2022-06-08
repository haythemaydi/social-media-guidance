import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import NewcomerHome from "../newcomerHome/NewcomerHome";
import PrivateHome from "../privateHome/PrivateHome";
axios.defaults.withCredentials = true;
const Welcome = () => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  console.log(user);

  /* const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:8000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };*/
  const getRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((error) => console.log("error on the getUser", error));
    const data = await res.data;
    console.log(data);
    return data;
  };
  const getAllRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/allUser", {
        withCredentials: true,
      })
      .catch((error) => console.log("error on the getUser", error));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    getAllRequest().then((data) => {
      setUsers(data.users);
      console.log(data.users);
    });
  }, []);

  useEffect(() => {
    getRequest().then((data) => setUser(data.user));
  }, []);

  let page = "not found";
  if (user) {
    if (user.selectedRole === "coach" || user.selectedRole === "volunteer") {
      page = <PrivateHome user={user} users={users} />;
    } else {
      page = <NewcomerHome user={user} users={users} />;
    }
  }
  return <div>{page}</div>;
};

export default Welcome;
