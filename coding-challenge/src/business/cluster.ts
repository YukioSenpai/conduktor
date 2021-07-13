import { AsOpaque, summonFor } from "@morphic-ts/batteries/lib/summoner-ESBST";
import { AType, EType } from "@morphic-ts/summoners/lib"

const { summon } = summonFor<{}>({})

const Cluster_ = summon(F => F.interface({ id: F.string(), name: F.string() }, 'Cluster'))
export interface Cluster extends AType<typeof Cluster_> {}
export interface ClusterRaw extends EType<typeof Cluster_> {}
export const Cluster = AsOpaque<ClusterRaw, Cluster>()(Cluster_)