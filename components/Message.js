import React from 'react';
import PropTypes from 'prop-types';
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
      <h3>
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

Message.propTypes = {
  message: PropTypes.object,
  onDelete: PropTypes.func
};
export default Message;
