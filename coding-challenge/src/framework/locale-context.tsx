import React, { useContext, useState } from "react"
import { Locale } from "../models/locale"
import { constVoid } from 'fp-ts/lib/function'

export const defaultLocale = Locale.wrap('en')

export const LocaleContext = React.createContext({value : defaultLocale, setValue: constVoid})

export const LocaleFakeContext = React.createContext(defaultLocale)

export const LocaleProvider: React.FC = ({ children }) => {
    const [state, setState] = useState(defaultLocale)

    return (
      <LocaleContext.Provider value={{ value: state, setValue: () => setState }}>
        {children}
      </LocaleContext.Provider>
    )
  }
  
export const useLocale = () => useContext(LocaleContext).value
export const useSetLocale = () => useContext(LocaleContext).setValue