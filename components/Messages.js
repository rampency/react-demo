import { useState, useEffect } from 'react';
import React from 'react';
import data from '../data.json';
import Message from './Message';
import Button from './Button';
function Messages() {
  const [messageList, setMessageList] = useState(data['messages']);
  const [accending, setAccending] = useState(false);
  useEffect(() => {
    console.log('mounted');
    let foo = messageList
      .slice()
      .filter(
        (message, index, self) =>
          index ===
          self.findIndex(
            t => t.uuid === message.uuid && t.content === message.content
          )
      );
    setMessageList(foo);
    return () => console.log('unmounting...');
  }, []); // <-- add this empty array here

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
    setMessageList(messageList.filter(message => message.uuid !== id));
    console.log(messageList.length);
  };
  return (
    <div className="container">
      <Button toggle={accending} onClick={changeMessageOrder} />
      {messageList.map((message, index) => {
        if (index < 5) {
          return <Message message={message} onDelete={onDelete} />;
        }
      })}
    </div>
  );
}
export default Messages;
