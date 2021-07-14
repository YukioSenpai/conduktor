import * as E from 'fp-ts/lib/Either'
import { constVoid, pipe } from 'fp-ts/lib/function'
import React, { useContext } from 'react'
import useSwr from 'swr'
import { Locale, LocaleCodec } from '../models/locale'

export interface ContextLocale {
  value: Locale
  setValue: (value: Locale) => void
}

export const defaultLocale = Locale.wrap('en')

export const LocaleContext = React.createContext<ContextLocale>({
  value: defaultLocale,
  setValue: constVoid
})

export const LocaleProvider: React.FC = ({ children }) => {
  const getSavedLocale = () =>
    pipe(
      LocaleCodec.decode(localStorage.getItem('locale')),
      E.map(Locale.wrap),
      E.getOrElse(() => defaultLocale)
    )

  const { data, mutate } = useSwr('locale', getSavedLocale)

  const saveLocale = (l: Locale) => {
    localStorage.setItem('locale', LocaleCodec.encode(Locale.unwrap(l)))
    mutate(l)
  }

  return (
    <LocaleContext.Provider value={{ value: data || defaultLocale, setValue: saveLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => useContext(LocaleContext).value
export const useSetLocale = () => useContext(LocaleContext).setValue
