import React, { useState, useEffect } from 'react'

const FAST_INTERVAL = 10000
const NORMAL_INTERVAL = 30000
const SLOW_INTERVAL = 60000

interface RefreshState {
    slow: number
    normal: number
    fast: number
}

const RefreshContext = React.createContext<RefreshState>({ slow: 0, normal: 0, fast: 0 })

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [slow, setSlow] = useState(0)
  const [normal, setNormal] = useState(0)
  const [fast, setFast] = useState(0)

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1)
    }, FAST_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
        setNormal((prev) => prev + 1)
    }, NORMAL_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlow((prev) => prev + 1)
    }, SLOW_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return <RefreshContext.Provider value={{ slow, normal, fast }}>{children}</RefreshContext.Provider>
}

export { RefreshContext, RefreshContextProvider }
