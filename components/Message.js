import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Message = ({ message, onDelete }) => {
  const formatDate = date => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return (
      new Date(date).toLocaleDateString('en', options) +
      ' at ' +
      new Date(date).toLocaleTimeString('en-US')
    );
  };
  return (
    <div className="Message">
      <h3 key={message.uuid}>
        {message.content}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(message.uuid)}
        />
      </h3>
      <h4 style={messageInfo}> Sent by {message.senderUuid}</h4>
      <h4 style={messageInfo}>{formatDate(message.sentAt)}</h4>
    </div>
  );
};
const messageInfo = {
  color: 'blue',
  fontSize: '10px'
};
export default Message;
