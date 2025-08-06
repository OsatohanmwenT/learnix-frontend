// context/UserContext.tsx
"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

type User = { name: string; email: string; id: string } | null

const UserContext = createContext<{ user: User }>({ user: null })

export const UserContextProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser: User
}) => {
  const [user, setUser] = useState<User>(initialUser)

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)