import * as t from 'io-ts'
import { fromNewtype } from 'io-ts-types/lib/fromNewtype'
import { iso, Newtype } from 'newtype-ts'

interface LocaleBrand {
    readonly Locale: unique symbol
}
export interface Locale extends Newtype<LocaleBrand, string> { }
export const Locale = iso<Locale>()
export const LocaleCodec = fromNewtype<Locale>(t.string)