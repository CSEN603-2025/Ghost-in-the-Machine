import { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../contexts/NotificationContext';

export default function NotificationBell() {
  // get notifications from context
  const { notifications, unreadCount, markAsRead, removeNotification } = useNotifications();
  const [open, setOpen] = useState(false);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.notification-bell')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="notification-bell">
      <button
        className={`bell-button ${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
      >
        <FiBell size={24} />
        {unreadCount > 0 && (
          <motion.span 
            className="badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={unreadCount}
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="dropdown-header">
              <h3>Notifications</h3>
              {notifications.length > 0 && (
                <button 
                  className="mark-all-read"
                  onClick={() => notifications.forEach(n => !n.read && markAsRead(n.id))}
                >
                  Mark all read
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="empty-state">
                <FiBell size={48} className="empty-icon" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="notification-list">
                {notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    className={`notification-item ${n.read ? 'read' : 'unread'} ${n.type}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    layout
                  >
                    <div className="notification-content">
                      <p>{n.message}</p>
                      <small>{new Date(n.id).toLocaleTimeString()}</small>
                    </div>
                    <div className="notification-actions">
                      {!n.read && (
                        <button 
                          className="action-button read-button"
                          onClick={() => markAsRead(n.id)}
                          aria-label="Mark as read"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        className="action-button delete-button"
                        onClick={() => removeNotification(n.id)}
                        aria-label="Delete notification"
                      >
                        ×
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}