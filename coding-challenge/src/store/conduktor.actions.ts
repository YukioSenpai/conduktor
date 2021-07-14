  import { AType, EType } from '@morphic-ts/summoners/lib'
import { Cluster } from '../business/cluster'
import { Topic } from '../business/topic'
import { AsOpaque, summon, tagged } from '../framework/summoner'

const CreateCluster_ = summon(F => F.interface({ cluster: Cluster(F), type: F.stringLiteral('CreateCluster') }, 'CreateCluster'))
export interface CreateCluster extends AType<typeof CreateCluster_> { }
export interface CreateClusterRaw extends EType<typeof CreateCluster_> { }
export const CreateCluster = AsOpaque<CreateClusterRaw, CreateCluster>()(CreateCluster_)

const CreateTopic_ = summon(F => F.interface({ topic: Topic(F), clusterId: F.string(), type: F.stringLiteral('CreateTopic') }, 'CreateTopic'))
export interface CreateTopic extends AType<typeof CreateTopic_> { }
export interface CreateTopicRaw extends EType<typeof CreateTopic_> { }
export const CreateTopic = AsOpaque<CreateTopicRaw, CreateTopic>()(CreateTopic_)

export const ConduktorActions = tagged('type')({ CreateCluster, CreateTopic })
export type ConduktorActions = AType<typeof ConduktorActions>