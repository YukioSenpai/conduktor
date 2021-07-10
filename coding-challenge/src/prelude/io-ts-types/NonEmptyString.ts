/**
 * @since 0.4.5
 */
import * as t from 'io-ts'
import { TaggedType, withTag } from '../io-ts/tag'

/**
 * @since 0.4.5
 */
export interface NonEmptyStringBrand {
    readonly NonEmptyString: unique symbol
}

/**
 * @since 0.4.5
 */
export type NonEmptyString = t.Branded<string, NonEmptyStringBrand>

/**
 * @since 0.4.5
 */
export interface NonEmptyStringC extends TaggedType<NonEmptyString, string, 'NonEmptyString'> { }

/**
 * A codec that succeeds if a string is not empty
 *
 * @example
 * import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString'
 * import { right } from 'fp-ts/lib/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * assert.deepStrictEqual(NonEmptyString.decode('a'), right('a'))
 * assert.deepStrictEqual(PathReporter.report(NonEmptyString.decode('')), ['Invalid value "" supplied to : NonEmptyString'])
 *
 * @since 0.4.5
 */
export const NonEmptyString: NonEmptyStringC = withTag('NonEmptyString')(
    t.brand(t.string, (s: any): s is NonEmptyString => s.length > 0, 'NonEmptyString')
)