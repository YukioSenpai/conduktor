import { LanguageTag } from './LanguageTag';
import NumberFormatOptions = Intl.NumberFormatOptions;
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
/**
 * Describes additional formats that can be referenced in formatting strings.
 *
 * See [Format.JS documentation](https://formatjs.io/guides/message-syntax/) for details.
 */
export interface FormatOptions {
    number?: {
        [key: string]: NumberFormatOptions;
    };
    date?: {
        [key: string]: DateTimeFormatOptions;
    };
    time?: {
        [key: string]: DateTimeFormatOptions;
    };
}
/**
 * Global [[FormatOptions]] used by the [[format]] and [[formatObject]] function if nothing else is
 * specified there. You can use [[setFormats]] and [[addFormats]] to register custom formats.
 *
 * By default the number formats `#`, `#.#`, `#.##` to `#.#####` are defined.
 * You can use them in a message string like eg. `{1, number, #.##}` to format a number with the specified number of
 * fraction digits.
 */
export declare function formats(): FormatOptions;
/**
 * Replaces the current global [[formats]].
 */
export declare function setFormats(formatOptions: FormatOptions): void;
/**
 * Merges the specified formats into the global [[formats]].
 */
export declare function addFormats(formatOptions: FormatOptions): void;
/**
 * Format message using [ICU message syntax]{@link https://formatjs.io/guides/message-syntax/}.
 *
 * **Example:**
 * ```typescript
 * const msg = formatObject<{msgCount: number}>(languageTag('en'),
 *                                              'Current message count is {msgCount, number}');
 * msg({msgCount: 3}); // 'Current message count is 3'
 * ```
 *
 * @param language the locale to be used for message formatting (e.g. for numbers and [[plural]]s)
 * @param msgFormat the message using [ICU message syntax]{@link https://formatjs.io/guides/message-syntax/}.
 * @param formatOptions custom format options used by the message.
 *  Defaults to the globally registered [[formats]].
 * @returns a function accepting the parameter object.
 */
export declare function formatObject<P>(language: LanguageTag, msgFormat: string, formatOptions?: FormatOptions): (parameters: P) => string;
/**
 * Format messages using [ICU message syntax]{@link https://formatjs.io/guides/message-syntax/}.
 * Instead of using an object as parameter like [[formatObject]] this function accepts up to five parameters,
 * which are then available by the names `1` to `5` inside the message string.
 *
 * **Example:**
 * ```typescript
 * format<number>(languageTag('en'), 'Current message count is {1, number}')(3);
 * ```
 *
 * @param language the language to be used for message formatting (e.g. for numbers and [[plural]]s)
 * @param msgFormat the message using [ICU message syntax]{@link https://formatjs.io/guides/message-syntax/}.
 * @param formatOptions custom format options used by the message.
 *  Defaults to the globally registered [[formats]].
 * @returns a function accepting the specified number of parameters.
 */
export declare function format<P1, P2 = undefined, P3 = undefined, P4 = undefined, P5 = undefined>(language: LanguageTag, msgFormat: string, formatOptions?: FormatOptions): (p1: P1, p2?: P2, p3?: P3, p4?: P4, p5?: P5) => string;
/**
 * Defines the different messages for a [[plural]]ized message.
 */
export interface Plural {
    zero?: string;
    one?: string;
    two?: string;
    few?: (n: number) => string;
    many?: (n: number) => string;
    other: (n: number) => string;
}
/**
 * Creates a pluralized message which will return the adequate message based on the provided number and language.
 *
 * **Example:**
 * ```typescript
 * const msg = plural(languageTag('en'), {
 *   zero: 'You have no new messages',
 *   one: 'You have one new message',
 *   other: n => format<number>(languageTag('en'), 'You have {1, number} new messages')(n)
 * });
 * msg(5); // 'You have 5 new messages'
 * ```
 *
 * @see [Format.JS message syntax](https://formatjs.io/guides/message-syntax/#plural-format) for details
 *
 * @param language the language to be used for decision which of the plural forms to choose.
 * @param p the messages for the different cases.
 * @returns a function accepting a numeral argument used to pick the right message.
 */
export declare function plural(language: LanguageTag, p: Plural): (n: number) => string;
/**
 * Definition of possible cases for [[select]] and [[selectObject]].
 *
 * The `other` case is chosen if non of the more specific cases are matching.
 */
export interface SelectOptions {
    [key: string]: string | undefined;
    other?: string;
}
/**
 * Selects a message from [[SelectOptions]] based on the provided selection parameter.
 *
 * @see [[selectObject]] for an example and if you need further formatting capabilities inside the messages
 *
 * @param language
 * @param options the possible cases
 * @returns a function expecting a selection string to pick the correct message from the provided options.
 */
export declare function select(language: LanguageTag, options: SelectOptions): (selection: string) => string;
/**
 * Selects and formats a message from [[SelectOptions]] based on the provided parameter object.
 *
 * **Example:**
 * ```typescript
 * const msg = selectObject<Person>(languageTag('en'), p => p.gender, {
 *     female: 'Dear Mrs. {name}',
 *     male: 'Dear Mr. {name}',
 *     other: 'Dear {name}'
 * });
 * msg({gender: 'female', name: 'Granger'}); // 'Dear Mrs. Granger'
 * ```
 *
 * @see [[select]] if you don't need the additional formatting options inside the messages.
 *
 * @param language
 * @param selector a function that extracts the selection key from the provided parameter object.
 * @param options the possible cases where each message will be formatted using
 *     [[formatObject]] based on the `parameters` object.
 * @returns a function expecting a single parameter object containing the selector and
 *     the values referenced by the messages.
 */
export declare function selectObject<P>(language: LanguageTag, selector: (parameters: P) => string, options: SelectOptions): (parameters: P) => string;
