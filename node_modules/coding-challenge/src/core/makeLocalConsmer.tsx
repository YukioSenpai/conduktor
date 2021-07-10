import * as React from 'react'
import { languageTag, MessageProvider } from 'typed-intl'

export type TranslatorInjector<PropName extends string, M> = <P extends object>(
    Wrapped: React.ComponentType<P & { [k in PropName]: M }>
) => React.FC<P>

export type TranslatorLocaleConsumer<PropName extends string> = <M extends object>(
    translator: MessageProvider<M>
) => TranslatorInjector<PropName, M>

export type LocaleConsumer<PropName extends string> = <L extends string>(
    Consumer: React.ExoticComponent<React.ConsumerProps<L>>
) => TranslatorLocaleConsumer<PropName>

export type WrappedPropsType<Wrapped> = Wrapped extends React.ComponentType<infer X>
    ? X
    : 'not a React.ComponentType'

export const makeFlexibleLocaleConsumer = <PropName extends string>(
    propName: PropName
): LocaleConsumer<PropName> => Consumer => translator => Wrapped => props => (
    <Consumer
        children={locale => {
            const m = translator.messagesFor(languageTag(locale))
            const wrappedProps = { ...props, [propName]: m } as WrappedPropsType<typeof Wrapped>
            return <Wrapped {...wrappedProps} />
        }}
    />
)
export type LocaleConsumerProps<K extends string, T> = { [k in K]: T }

export const makeLocaleConsumer: LocaleConsumer<'msg'> = makeFlexibleLocaleConsumer('msg')

export interface MsgProps<T> extends LocaleConsumerProps<'msg', T> { }