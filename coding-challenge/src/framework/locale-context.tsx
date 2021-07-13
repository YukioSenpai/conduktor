import React, { useContext, useState } from "react"
import { Locale } from "../models/locale"
import { constVoid } from 'fp-ts/lib/function'

export interface ContextLocale {
  value: Locale
  setValue: (value: Locale) => void
}

export const defaultLocale = Locale.wrap('en')

export const LocaleContext = React.createContext<ContextLocale>({value : defaultLocale, setValue: constVoid})

export const LocaleFakeContext = React.createContext(defaultLocale)

export const LocaleProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState(defaultLocale)

    return (
      <LocaleContext.Provider value={{ value, setValue }}>
        {children}
      </LocaleContext.Provider>
    )
  }
  
export const useLocale = () => useContext(LocaleContext).value
export const useSetLocale = () => useContext(LocaleContext).setValue