import React, { useContext } from 'react'
import { languageTag, MessageProvider } from 'typed-intl'
import { Locale } from '../models/locale'
import { LocaleFakeContext } from '../framework/locale-context'

const translator = <L>(C: React.Context<L>, unwrap: (locale: L) => string) => <A>(
    a: MessageProvider<A>
): A => {
    const locale = useContext(C)
    return a.messagesFor(languageTag(unwrap(locale)))
}

export const useTranslator = translator(LocaleFakeContext, Locale.unwrap)