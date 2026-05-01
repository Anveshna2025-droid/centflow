import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check LocalStorage for existing session on mount
    const storedUser = localStorage.getItem('cf_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: '1234567890',
          displayName: 'Demo User',
          email: 'demo@centflow.app',
          photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
        };
        setUser(mockUser);
        localStorage.setItem('cf_user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 1000);
    });
  };

  const updateProfile = (name) => {
    const updatedUser = { ...user, displayName: name, photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random` };
    setUser(updatedUser);
    localStorage.setItem('cf_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cf_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
