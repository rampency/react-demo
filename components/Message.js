import React from 'react';

const Message = ({ message }) => {
  return (
    <div>
      <h3 key={message.id}>{message.content}</h3>
      <p>{message.sentAt}</p>
    </div>
  );
};

export default Message;
