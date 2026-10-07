import { createContext, useContext, useEffect, useState } from 'react'
import { mascot } from '../data/portfolio'

const KEY = 'portfolio-mascot'
const MascotContext = createContext({ template: 'penguin', setTemplate: () => {} })

export function MascotProvider({ children }) {
  const [template, setTemplate] = useState(() => {
    try {
      return localStorage.getItem(KEY) || mascot.defaultTemplate
    } catch {
      return mascot.defaultTemplate
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, template)
    } catch {
      /* storage unavailable, ignore */
    }
  }, [template])

  return (
    <MascotContext.Provider value={{ template, setTemplate }}>
      {children}
    </MascotContext.Provider>
  )
}

export const useMascot = () => useContext(MascotContext)