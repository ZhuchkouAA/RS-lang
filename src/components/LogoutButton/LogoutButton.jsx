import React from 'react';
import PropTypes from 'prop-types';

const LogoutButton = ({ removeUserToken }) => {
  return (
    <button onClick={removeUserToken} type="button">
      `logout`
    </button>
  );
};

LogoutButton.defaultProps = {
  removeUserToken: PropTypes.func,
};

LogoutButton.propTypes = {
  removeUserToken: PropTypes.func,
};

export default LogoutButton;
