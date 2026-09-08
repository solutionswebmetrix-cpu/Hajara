import { createContext, useContext, useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NavigationContext = createContext(null)

export const NavigationProvider = ({ children }) => {
  const location = useLocation()
  const stackRef = useRef([])
  const indexRef = useRef(-1)
  const initializedRef = useRef(false)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  useEffect(() => {
    const stack = stackRef.current
    let idx = indexRef.current
    const entry = { pathname: location.pathname, key: location.key }

    if (!initializedRef.current) {
      initializedRef.current = true
      if (stack.length === 0) {
        stack.push(entry)
        idx = 0
      } else {
        idx = Math.max(0, Math.min(indexRef.current, stack.length - 1))
      }
      indexRef.current = idx
      setCanGoBack(idx > 0)
      setCanGoForward(idx < stack.length - 1)
      return
    }

    const current = stack[idx]

    if (idx + 1 < stack.length && stack[idx + 1].key === location.key) {
      idx = idx + 1
    } else if (idx - 1 >= 0 && stack[idx - 1].key === location.key) {
      idx = idx - 1
    } else if (!current || current.key !== location.key) {
      if (idx < stack.length - 1) {
        stack.length = idx + 1
      }
      stack.push(entry)
      idx = stack.length - 1
    }

    indexRef.current = idx
    setCanGoBack(idx > 0)
    setCanGoForward(idx < stack.length - 1)
  }, [location.key, location.pathname])

  return (
    <NavigationContext.Provider value={{ canGoBack, canGoForward }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const ctx = useContext(NavigationContext)
  if (!ctx) {
    return { canGoBack: false, canGoForward: false }
  }
  return ctx
}
