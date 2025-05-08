import React from 'react';
import PropTypes from 'prop-types';

const EmailItem = ({ email, onClick }) => {
  const { sender, subject, snippet, time } = email;
  return (
    <div
      onClick={() => onClick(email)}
      className="flex justify-between items-center p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors duration-200"
    >
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{sender}</p>
        <p className="text-gray-600 truncate">{subject} - {snippet}</p>
      </div>
      <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">
        {time}
      </div>
    </div>
  );
};

EmailItem.propTypes = {
  email: PropTypes.shape({
    sender: PropTypes.string,
    subject: PropTypes.string,
    snippet: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

EmailItem.defaultProps = {
  onClick: () => {},
};

export default EmailItem;