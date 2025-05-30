import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  removeNotification: () => {},
  clearNotifications: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    // Check if a notification with the same message already exists
    setNotifications(prev => {
      const existingNotification = prev.find(n => n.message === message);
      if (existingNotification) {
        return prev; // Don't add if already exists
      }
      return [...prev, { id, message, type, read: false }];
    });
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, removeNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
