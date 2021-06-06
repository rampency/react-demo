import { useState } from 'react';
import React, { Component } from 'react';
import messages from '../data.json';
import Message from '/.Message';
function Messages() {
  const [messageList, setMessageList] = useState(messages['messages']);
  return (
    <div className="container">
      {messageList.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
export default Messages;
