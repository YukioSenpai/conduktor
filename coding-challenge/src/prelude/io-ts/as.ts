import * as t from 'io-ts'

export interface Type<A> extends TypeO<A, A> { }

export const as = <A>(O: t.Type<A>): Type<A> => O

export type TypeO<A, B = A> = t.Type<A, B, unknown>

export const asOut = <A, O>(O: t.Type<A, O>): TypeO<A, O> => O

/**
 * the pended of `as` the difference is that is can be used for transforming `Types`, the one for which their Output type (encoded) is not the safe as their working `Type` (ex: Date)
 **/
export interface TypeMixed<A> extends TypeO<A, unknown> { }

export const asMixed = <A>(O: t.Type<A, unknown>): TypeMixed<A> => O
export const asSpec = <A>() => <Out>(o: t.Type<A, Out>): TypeO<A, Out> => o