import "./message.scss";
import { format } from "timeago.js";
const Message = ({ own, message }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message__top">
        <p className="message__text">{message.text}</p>
      </div>
      <div className="message__bottom">{format(message.createdAt)}</div>
    </div>
  );
};
export default Message;
