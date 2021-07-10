/**
 * A language tag as defined in [BCP-47](http://www.ietf.org/rfc/bcp/bcp47.txt).
 *
 * The only possibility to create a `LanguageTag` is using the [[languageTag]] function which guarantees,
 * that there is only one single instance for each exact language specification. Thus it is save to use
 * strict equality (`===`) when comparing to language tags.
 */
export interface LanguageTag {
    /**
     * The text representation of the full tag (e.g. `en-US`).
     */
    readonly tag: string;
    /**
     * The language of the tag (e.g. `en`).
     */
    readonly language: string;
    /**
     * The extended language subtag (e.g. `yue` in `zh-yue`).
     */
    readonly extendedLanguage?: string;
    /**
     * The script subtag (e.g. `Latn` in `az-Latn`).
     */
    readonly script?: string;
    /**
     * The region subtag (e.g. `US` in `en-US`).
     */
    readonly region?: string;
    /**
     * The variant subtag (e.g. `nedis` in `sl-nedis` or `sl-IT-nedis`).
     */
    readonly variant?: string;
    /**
     * The extension subtag (e.g. `u-co-phonebk` in `de-DE-u-co-phonebk`).
     */
    readonly extension?: string;
    /**
     * Checks whether this language matches the other one. Effectively only the [[language]] subtags are compared.
     *
     * @param other the language to check against.
     * @returns `true` if both tags specify the same language.
     */
    matches(other: LanguageTag): boolean;
    /**
     * Checks whether this language matches one of the specified languages. Effectively only the [[language]] subtags
     * are compared.
     * @param others the languages to check against.
     * @returns `true` if at least one of the specified tags specifies the same language.
     */
    matchesOneOf(others: LanguageTag[]): boolean;
    /**
     * Returns the next more generic language tag by omitting the most specific subtag.
     * @returns The next more generic language tag or `undefined` if this language tag has only a [[language]] subtag.
     */
    parent(): LanguageTag | undefined;
    /**
     * Calculates the equality among this and the provided language tag.
     *
     * You should not depend on the absolute value returned, instead the value is meant for picking the best matching
     * language tag from a list.
     *
     * @param other the tag to check equality against
     * @returns equality between this and the other tag expressed as a value between `0` (language does not match) and
     *     `1` (all subtags match).
     */
    equality(other: LanguageTag): number;
    /**
     * Returns the language tag from the list that best matches this language tag.
     * @param others the language tags to test.
     * @returns the best matching language tag or `undefined` if no one matches.
     */
    pickBestMatching(others: LanguageTag[]): LanguageTag | undefined;
}
/**
 * Provides a [[LanguageTag]] for the specified string representation of a language tag.
 *
 * It is guaranteed, that this function returns the same [[LanguageTag]] instance for the same string
 * (ignoring case). Thus it is save to use strict equality (`===`) when comparing [[LanguageTag]]s.
 *
 * @param tag a language tag string as defined in [BCP-47](http://www.ietf.org/rfc/bcp/bcp47.txt)
 * @returns the resulting language tag
 * @throws an exception if the provided string is not a valid language tag.
 */
export declare function languageTag(tag: string): LanguageTag;
