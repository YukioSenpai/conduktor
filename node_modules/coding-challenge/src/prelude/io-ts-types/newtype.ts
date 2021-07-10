import * as t from 'io-ts'
import { Iso } from 'monocle-ts'
import { AnyNewtype, CarrierOf } from 'newtype-ts'
export type NewTypeType<X extends AnyNewtype> = Iso<X, CarrierOf<X>> & t.Type<X, CarrierOf<X>>