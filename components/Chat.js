const Chat = ({ chat }) => {
  console.log(chat);
  return (
    <div className="chat-container">
      {chat.map((response, index) => {
        const { user, gpt } = response;
        return (
          <div key={index} className="chat">
            <div className="chat-box">
              <p className="chat-user">User:</p>
              <p>{user}</p>
            </div>

            <div className="chat-box">
              <p className="chat-gpt">GPT:</p>
              <p>{gpt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
