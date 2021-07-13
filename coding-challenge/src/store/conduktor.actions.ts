  import { AType, EType } from '@morphic-ts/summoners/lib'
import { Cluster } from '../business/cluster'
import { AsOpaque, summon, tagged } from '../framework/summoner'

const UpdateClusters_ = summon(F => F.interface({ clusters: F.array(Cluster(F)), type: F.stringLiteral('UpdateClusters') }, 'UpdateClusters'))
export interface UpdateClusters extends AType<typeof UpdateClusters_> { }
export interface UpdateClustersRaw extends EType<typeof UpdateClusters_> { }
export const UpdateClusters = AsOpaque<UpdateClustersRaw, UpdateClusters>()(UpdateClusters_)

export const ConduktorActions = tagged('type')({ UpdateClusters })
export type ConduktorActions = AType<typeof ConduktorActions>