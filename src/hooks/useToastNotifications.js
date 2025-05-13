import { toast } from 'react-toastify';
import { useNotifications } from '../contexts/NotificationContext';

/**
 * Hook to trigger toast notifications and simultaneously log them to notification context.
 */
export function useToastNotifications() {
  const { addNotification } = useNotifications();

  const success = (message) => {
    toast.success(message, { onClose: () => addNotification(message, 'success') });
  };

  const error = (message) => {
    toast.error(message, { onClose: () => addNotification(message, 'error') });
  };

  const info = (message) => {
    toast.info(message, { onClose: () => addNotification(message, 'info') });
  };

  const warning = (message) => {
    toast.warning(message, { onClose: () => addNotification(message, 'warning') });
  };

  return { success, error, info, warning };
}
