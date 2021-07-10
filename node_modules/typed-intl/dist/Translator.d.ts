import { LanguageTag } from './LanguageTag';
/**
 * Messages are defined as simple JavaScript objects where the property key is the message key and the value is the
 * message. Messages should either be simple `string`s or functions returning a `string`.
 */
export declare type Messages = {};
/**
 * Sometimes you may need the current language when defining [[Messages]], for example to define language dependent
 * formatting. Instead of directly providing a [[Messages]] object you may provide a function of this type then.
 */
export declare type LocalizedMessages<M extends Messages> = (language: LanguageTag) => M;
/**
 * Some functions allow you to either directly specify a [[Messages]] object or a [[LocalizedMessages]] function.
 */
export declare type MessagesParameter<M extends Messages> = M | LocalizedMessages<M>;
/**
 * Either a [[LanguageTag]] or a `string` which can be provided to [[languageTag]]().
 */
export declare type Language = LanguageTag | string;
/**
 * An object that provides messages for a specified language.
 */
export interface MessageProvider<M extends Messages> {
    /**
     * Provides messages for a specified language.
     *
     * Subsequent calls to this method with the same `language` parameter will provide the same object.
     * Thus calling this method multiple times with the same `language` parameter is a fast operation.
     *
     * @param language the language to return the best matching translation for.
     * @returns a message object for the specified language.
     *  Missing identifiers will be filled up with those from parent languages (see [[LanguageTag.parent]]) or the
     *     default language.
     */
    messagesFor(language: LanguageTag): Readonly<M>;
    /**
     * Like [[messagesFor]] but uses [[preferredLanguage]] as language.
     */
    messages(): Readonly<M>;
}
/**
 * Typesafe builder for a [[MessageProvider]].
 */
export interface Translator<M extends Messages> extends MessageProvider<M> {
    /**
     * Provides a new translator additionally partially supporting the specified language. Partially supporting a
     * language means that not for all keys messages are defined. When retrieving translations using
     * [[MessageProvider.messagesFor]] these missing keys will be filled up with the parent and default languages.
     *
     * @param language
     * @param translation
     *  messages object which may not provide all of the keys available in the default translation.
     * @returns A new translator supporting the specified language.
     */
    partiallySupporting(language: Language, translation: MessagesParameter<Partial<M>>): Translator<M>;
    /**
     * Provides a new translator additionally supporting a translation of the specified language.
     * The provided [[Messages} object must specify all keys already defined for the default language of this
     * translator.
     *
     * @param language
     * @param translation
     *  messages object which must provide all of the keys available in the default translation.
     * @returns A new translator supporting the specified language.
     */
    supporting(language: string, translation: MessagesParameter<M>): Translator<M>;
    /**
     * Provides a [[MessageProvider]] supporting the keys from `base` and the keys from this translator.
     * Messages from this translator will override messages with the same keys in `base`.
     * @param base provider of base messages.
     * @returns the combined [[MessageProvider]]
     */
    extending<B extends Messages>(base: MessageProvider<B>): MessageProvider<B & M>;
}
/**
 * Create a [[Translator]] with the specified default messages.
 * @param defaultMessages messages to be used if no messages for a selected translation are available.
 * @returns translator with the specified default messages.
 */
export declare function translate<M>(defaultMessages: MessagesParameter<M>): Translator<M>;
/**
 * Picks the best supported language based on the user's preferred languages.
 *
 * @param availableTranslations the translations provided by this application
 * @param usersPreferredLanguages the user's preferred languages ordered by preference (most preferred first)
 * @returns the best matching language from `usersPreferredLanguages` or the first if no one matches.
 */
export declare function pickPreferredLanguage(availableTranslations: LanguageTag[], usersPreferredLanguages: LanguageTag[]): LanguageTag;
/**
 * The preferred language to be used when calling [[MessageProvider.messages]].
 *
 * By default this is set to `navigator.language`.
 * Adjust it using [[setPreferredLanguage]] or [[selectPreferredLanguage]].
 */
export declare function preferredLanguage(): LanguageTag | undefined;
/**
 * Sets the preferred language to be used when calling [[MessageProvider.messages]].
 *
 * @param language language to be used for retrieving messages with [[MessageProvider.messages]].
 */
export declare function setPreferredLanguage(language: LanguageTag): void;
/**
 * Sets the [[preferredLanguage]] based on the translations supported by this application and the user's
 * language preferences.
 *
 * @see [[pickPreferredLanguage]]
 * @see [[setPreferredLanguage]]
 *
 * @param availableTranslations the languages this app provides translations for
 * @param usersPreferredLanguages the user's preferred languages ordered by preference (most preferred first).
 */
export declare function selectPreferredLanguage(availableTranslations: string[], usersPreferredLanguages?: string[]): void;
