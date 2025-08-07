// context/UserContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext<{
  user: User | null;
}>({
  user: null,
});

export const UserContextProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User;
}) => {
  const [user, setUser] = useState<User>(initialUser);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
