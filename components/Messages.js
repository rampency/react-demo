import { useState } from 'react';
import React from 'react';
import messages from '../data.json';
import Message from './Message';
import Button from './Button';
function Messages() {
  const [messageList, setMessageList] = useState(messages['messages']);
  const [accending, setAccending] = useState(false);
  let changeMessageOrder = () => {
    setAccending(!accending);
  };
  const onDelete = id => {
    console.log('delete' + id);
  };
  return (
    <div className="container">
      <Button toggle={accending} onClick={changeMessageOrder} />
      {messageList.map(message => (
        <Message key={message.uuid} message={message} onDelete={onDelete} />
      ))}
    </div>
  );
}
export default Messages;
