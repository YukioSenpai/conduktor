import { iso, Newtype } from 'newtype-ts'
import * as t from "io-ts"

interface LocaleBrand {
    readonly Locale: unique symbol
}
export interface Locale extends Newtype<LocaleBrand, "en" | "fr"> { }
export const Locale = iso<Locale>()

export const LocaleCodec = t.keyof({
    en: null,
    fr:null
})