
import * as Summoner from "@morphic-ts/batteries/lib/summoner-ESBST"
import { EqURI } from "@morphic-ts/eq-interpreters/lib/hkt"
import { FastCheckURI } from "@morphic-ts/fastcheck-interpreters/lib/hkt"
import { IoTsURI } from "@morphic-ts/io-ts-interpreters/lib/hkt"
import { JsonSchemaURI } from "@morphic-ts/json-schema-interpreters/lib/hkt"
import { ShowURI } from "@morphic-ts/show-interpreters/lib/hkt"

const { AsOpaque, AsUOpaque, summonFor } = Summoner

export interface AppEnv {}

const { summon, tagged } = summonFor<AppEnv>({})
export type M<E, A> = Summoner.M<AppEnv, E, A>
export type UM<A> = Summoner.UM<AppEnv, A>

export { summon, AsOpaque, AsUOpaque, tagged, EqURI, IoTsURI, FastCheckURI, ShowURI, JsonSchemaURI }