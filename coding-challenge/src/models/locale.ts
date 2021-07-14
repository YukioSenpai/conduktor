import { iso, Newtype } from 'newtype-ts'
import * as t from "io-ts"

interface LocaleBrand {
    readonly Locale: unique symbol
}
export const LocaleCodec = t.keyof({
    en: null,
    fr:null
})
export interface Locale extends Newtype<LocaleBrand,  t.TypeOf<typeof LocaleCodec>> { }
export const Locale = iso<Locale>()

