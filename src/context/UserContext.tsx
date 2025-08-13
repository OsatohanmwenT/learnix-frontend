// context/UserContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext<{
  user: User | null;
  updateUser: (userData: User | null) => void;
}>({
  user: null,
  updateUser: () => {},
});

export const UserContextProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const updateUser = (userData: User | null) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
