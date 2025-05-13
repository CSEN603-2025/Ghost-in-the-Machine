import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Toast component: triggers on mount and shows a toast of given type and message.
 * Props:
 * - message: string to display
 * - type: one of 'success', 'error', 'info', 'warning'
 * - containerProps: additional props for ToastContainer
 */
const Toast = ({ message, type = 'info', containerProps = {} }) => {
  useEffect(() => {
    toast[type](message);
  }, [message, type]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      {...containerProps}
    />
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  containerProps: PropTypes.object,
};

export default Toast;
