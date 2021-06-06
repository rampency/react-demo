import React from 'react';
import PropTypes from 'prop-types';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';

const Button = ({ toggle, onClick }) => {
  return (
    <div>
      {toggle ? (
        <FaRegArrowAltCircleDown style={{ color: 'blue', cursor: 'pointer' }} 
        onClick={onClick}/>
      ) : (
        <FaRegArrowAltCircleUp style={{ color: 'blue', cursor: 'pointer' }} onClick={onClick}/>
      )}
    </div>
  );
};

Button.defaultProps = {
  toggle: false
};

Button.propTypes = {
  onClick: PropTypes.func
};

export default Button;
