import { useState, useEffect } from 'react';
import React from 'react';
import data from '../data.json';
import Message from './Message';
import Button from './Button';
function Messages() {
  const [messageList, setMessageList] = useState(data['messages']);
  const [currentList, setCurrentList] = useState([]);
  const [accending, setAccending] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);
  const messagesPerPage = 5;
  let currentPage = 1;
  useEffect(() => {
    let uniqueList = messageList
      .slice()
      .filter(
        (message, index, self) =>
          index ===
          self.findIndex(
            t => t.uuid === message.uuid && t.content === message.content
          )
      );
    setMessageList(uniqueList);
    calculatePageNumbers(uniqueList);
    setCurrentMessageList(uniqueList);
  }, []);

  const changeMessageOrder = () => {
    setAccending(!accending);
    setMessageList([]);
    let sorted = messageList.sort((d1, d2) => {
      return accending
        ? new Date(d1.sentAt).getTime() - new Date(d2.sentAt).getTime()
        : new Date(d2.sentAt).getTime() - new Date(d1.sentAt).getTime();
    });
    setMessageList(sorted);
    setCurrentMessageList(sorted);
  };
  const onDelete = id => {
    let list = messageList.filter(message => message.uuid !== id);
    setMessageList(list);
    setCurrentMessageList(list);
    calculatePageNumbers(list);
  };
  const handlePageClick = pageNumber => {
    //remove previous active page number
    let x = document.getElementsByClassName('active');
    if (x.length > 0) {
      x[0].classList.remove('active');
    }

    currentPage = pageNumber;
    document.getElementById('page' + pageNumber).classList.add('active');
    setCurrentMessageList(messageList);
  };
  const setCurrentMessageList = list => {
    const indexOfLastTodo = currentPage * messagesPerPage;
    const indexOfFirstTodo = indexOfLastTodo - messagesPerPage;
    const currentList = list.slice(indexOfFirstTodo, indexOfLastTodo);
    setCurrentList(currentList);
  };
  const calculatePageNumbers = list => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(list.length / messagesPerPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  };

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <a
        className={number == 1 ? 'active' : ''}
        key={number.toString()}
        id={'page' + number}
        onClick={() => handlePageClick(number)}
      >
        {number}
      </a>
    );
  });
  return (
    <div className="container">
      <Button toggle={accending} onClick={changeMessageOrder} />
      {currentList.map((message, index) => {
        return (
          <Message
            key={index.toString()}
            id={index}
            message={message}
            onDelete={onDelete}
          />
        );
      })}
      <div className="pagination">{renderPageNumbers}</div>
    </div>
  );
}
export default Messages;
