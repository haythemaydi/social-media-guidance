import LoginForm from "../pages/loginForm/LoginForm";
import Register from "../pages/register/Register";
import PasswordReset from "../pages/resetPassword/PasswordReset";
import Welcome from "../pages/welcome/Welcome";
import Messenger from "./chatbox/Messenger";

import NotFound from "../pages/notFound/NotFound";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Modal from "../pages/Modal/Modal";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/user" element={<Welcome />} />
        <Route path="/chat" element={<Messenger />} />

        <Route path="/modal" element={<Modal />} />

        <Route path="/reset" element={<PasswordReset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
