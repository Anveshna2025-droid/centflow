import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-24 right-8 z-50 flex flex-col gap-3 pointer-events-none">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className="pointer-events-auto flex items-center gap-3 bg-cf-surface backdrop-blur-xl border border-cf-border shadow-xl px-4 py-3 rounded-xl animate-[slide-in-right_0.3s_ease-out_both] min-w-[300px]"
          >
            {n.type === 'success' && <CheckCircle2 className="w-5 h-5 text-cf-green" />}
            {n.type === 'error' && <AlertCircle className="w-5 h-5 text-cf-red" />}
            {n.type === 'info' && <Info className="w-5 h-5 text-cf-accent" />}
            
            <p className="flex-1 text-sm font-medium text-cf-text">{n.message}</p>
            
            <button 
              onClick={() => removeNotification(n.id)}
              className="text-cf-muted hover:text-cf-text transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
