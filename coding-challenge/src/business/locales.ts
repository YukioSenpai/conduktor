import * as as from '../prelude/io-ts/as'
import * as t from 'io-ts'

export type Locale = 'fr' | 'en'

export const Locale = as.asOut<Locale, string>(
    t.keyof(
        {
            fr: null,
            en: null
        },
        'Locale'
    )
)