import React from 'react';
import PropTypes from 'prop-types';

const EmailContent = ({ email }) => {
  if (!email) {
    return (
      <div className="p-4 text-gray-500">Select an email to view its content.</div>
    );
  }

  const { sender, subject, time, body } = email;
  return (
    <div className="bg-white shadow-lg p-6 h-full overflow-auto">
      <h3 className="text-xl font-semibold text-[#00106A] mb-2">{subject}</h3>
      <div className="text-sm text-gray-500 mb-4">From: {sender} - {time}</div>
      <div className="text-gray-700 whitespace-pre-line">{body}</div>
    </div>
  );
};

EmailContent.propTypes = {
  email: PropTypes.shape({
    sender: PropTypes.string,
    subject: PropTypes.string,
    time: PropTypes.string,
    body: PropTypes.string,
  }),
};

EmailContent.defaultProps = {
  email: null,
};

export default EmailContent;