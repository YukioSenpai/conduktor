import React from 'react'
import { Locale } from '../business/locales'
import { makeLocaleConsumer } from './makeLocalConsmer'

interface CommonProps {
    locale: Locale
  }

export const LocaleContext = React.createContext<Locale>('fr')

export const { Provider, Consumer } = LocaleContext

export const makeMsgInjector = makeLocaleConsumer(Consumer)