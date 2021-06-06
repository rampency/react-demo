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
    setMessageList([]);

    let sorted = messageList.sort((d1, d2) => {
      return accending
        ? new Date(d1.sentAt).getTime() - new Date(d2.sentAt).getTime()
        : new Date(d2.sentAt).getTime() - new Date(d1.sentAt).getTime();
    });
    setMessageList(sorted);
  };
  const onDelete = id => {
    console.log('delete' + id);
    setMessageList(messageList.filter(message => message.uuid !== id));
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
