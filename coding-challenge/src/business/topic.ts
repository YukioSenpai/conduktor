import { AsOpaque, summonFor } from "@morphic-ts/batteries/lib/summoner-ESBST";
import { AType, EType } from "@morphic-ts/summoners/lib"

const { summon } = summonFor<{}>({})

const Topic_ = summon(F => F.interface({ name: F.string() }, 'Topic'))
export interface Topic extends AType<typeof Topic_> {}
export interface TopicRaw extends EType<typeof Topic_> {}
export const Topic = AsOpaque<TopicRaw, Topic>()(Topic_)