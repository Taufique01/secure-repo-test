import React, { createContext, ReactNode, useContext, useState } from "react";

const Context = createContext<TokenState>([undefined, () => {}, () => {}]);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(tokenFromLocalstorage);

  const saveAndSetToken = (tokenToStore: string) => {
    setToken(tokenToStore);
    localStorage.setItem("token", tokenToStore);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(undefined);
  };

  return (
    <Context.Provider value={[token, saveAndSetToken, removeToken]}>
      {children}
    </Context.Provider>
  );
};

export const useAuthentication = () => {
  const [token, setToken, removeToken] = useContext(Context);

  return {
    setToken,
    token,
    isLoggedIn: !!token,
    logout: removeToken,
  };
};

const tokenFromLocalstorage = () => {
  const tokenFromStorage = localStorage.getItem("token");
  return tokenFromStorage == null ? undefined : tokenFromStorage;
};

type TokenState = [string | undefined, (p: string) => void, () => void];
