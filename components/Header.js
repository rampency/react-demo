import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
};
Header.defaultProps = {
  title: 'Modern Health Project'
};
Header.propTypes = {
  title: PropTypes.string.isRequired
};
export default Header;
