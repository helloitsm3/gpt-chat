/**
 * A simple component to handle rendering of the chats between user and AI
 * @param { chat } - What this does is to destructure the props so that we can use it to display on the front page. Learn more about destructuring here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * @returns
 */
const Chat = ({ chat }) => {
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
