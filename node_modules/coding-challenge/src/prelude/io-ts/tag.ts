import * as t from 'io-ts'

export interface TaggedType<A, O, Name extends string> extends t.Type<A, O>, Tagged<Name> { }

export interface Tagged<Tag> {
    _tag: Tag
}

export const withTag: <Tag extends string>(
    tag: Tag
) => <A, O = A>(o: t.Type<A, O, unknown>) => TaggedType<A, O, Tag> =
    //
    <Tag extends string>(tag: Tag) => <A, O = A>(o: t.Type<A, O, unknown>): TaggedType<A, O, Tag> => {
        ; (o as any)['_tag'] = tag
        return o as any
    }