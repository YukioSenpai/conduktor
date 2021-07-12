  
import { AType, EType } from '@morphic-ts/summoners/lib'
import { AsOpaque, summon, tagged } from '../framework/summoner'

const ShowClusters_ = summon(F => F.interface({ type: F.stringLiteral('ShowClusters') }, 'ShowClusters'))
export interface ShowClusters extends AType<typeof ShowClusters_> { }
export interface ShowClustersRaw extends EType<typeof ShowClusters_> { }
export const ShowClusters = AsOpaque<ShowClustersRaw, ShowClusters>()(ShowClusters_)

export const ConduktorActions = tagged('type')({ ShowClusters })
export type ConduktorActions = AType<typeof ConduktorActions>