import "./chatOnline.scss";
const ChatOnline = ({ user }) => {
  return (
    <div className="chat__online">
      <div className="chat__online__profile">
        <div className="chat__online__img__container">
          <div className="chat__online__badge"></div>
        </div>
        <span className="hat__online__name">{user && user.username}</span>
      </div>
    </div>
  );
};
export default ChatOnline;
