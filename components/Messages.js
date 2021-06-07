import { useState, useEffect, useRef } from 'react';
import React from 'react';
import data from '../data.json';
import Message from './Message';
import Button from './Button';
function Messages() {
  const [messageList, setMessageList] = useState(data['messages']);
  const [currentList, setCurrentList] = useState([]);
  const [accending, setAccending] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;
  const useMounted = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
    return isMounted;
  };
  const isMounted = useMounted();

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

  useEffect(() => {
    if (isMounted) {
      setCurrentMessageList(messageList);
    }
  }, [currentPage]);

  const changeMessageOrder = () => {
    setAccending(!accending);
    let sorted = messageList.sort((d1, d2) => {
      return accending
        ? new Date(d1.sentAt).getTime() - new Date(d2.sentAt).getTime()
        : new Date(d2.sentAt).getTime() - new Date(d1.sentAt).getTime();
    });
    setMessageList(sorted);
    setCurrentMessageList(sorted);
  };

  const onDelete = content => {
    let list = messageList.filter(message => message.content !== content);
    console.log(list);
    setMessageList(list);
    console.log(list.length);
    calculatePageNumbers(list);
    setCurrentMessageList(list);
  };

  const handlePageClick = pageNumber => {
    //remove previous active page number
    setCurrentPage(pageNumber);
    activePage(pageNumber);
  };

  const setCurrentMessageList = list => {
    const indexOfLastTodo = currentPage * messagesPerPage;
    const indexOfFirstTodo = indexOfLastTodo - messagesPerPage;
    const currentList = list.slice(indexOfFirstTodo, indexOfLastTodo);
    setCurrentList(currentList);
  };

  const calculatePageNumbers = list => {
    const pageNumber = [];
    let length = Math.ceil(list.length / messagesPerPage);
    for (let i = 1; i <= length; i++) {
      pageNumber.push(i);
    }
    setPageNumbers(pageNumber);

    if (currentPage > pageNumber.length) {
      handlePageClick(currentPage - 1); //incase user deletes all entries on the same page to help navigate to the correct page
    }
  };

  const activePage = number => {
    let x = document.getElementsByClassName('active');
    console.log(x.length)
    if (x[0] && x.length > 0) {
      x[0].classList.remove('active');
    }
    document.getElementById('page' + number).classList.add('active');
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
