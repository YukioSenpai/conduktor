import React from "react"
import { Locale } from "../models/locale"

const defaultLocale = Locale.wrap('fr')

export const LocaleContext = React.createContext(defaultLocale)