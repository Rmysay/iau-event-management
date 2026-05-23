import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser]   = useState(null)
  const [page, setPage]   = useState('home')
  const [sideOpen, setSideOpen] = useState(true)

  return (
    <AppContext.Provider value={{ user, setUser, page, setPage, sideOpen, setSideOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
