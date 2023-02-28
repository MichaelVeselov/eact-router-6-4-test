import { useState, createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);

  const signIn = (newUser, cb) => {
    setUser(newUser);
    cb();
  };

  const signOut = (cb) => {
    setUser(null);
    cb();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
