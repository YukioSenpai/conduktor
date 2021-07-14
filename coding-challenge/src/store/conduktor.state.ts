import { pipe } from 'fp-ts/lib/function'
import { Lens } from 'monocle-ts'
import * as L from 'monocle-ts/Lens'
import * as O from 'monocle-ts/Optional'
import { Cluster } from '../business/cluster'
import { Topic } from '../business/topic'

export interface ClusterState {
  cluster: Cluster
  topicState: ReadonlyArray<Topic>
}
export interface ConduktorState {
  clusterState: ReadonlyArray<ClusterState>
}

export const clusterLens = Lens.fromProp<ConduktorState>()('clusterState')

export const topicLens = Lens.fromProp<ClusterState>()('topicState')

export const clusterByIdOptional = (id: String) =>
  pipe(
    clusterLens,
    L.findFirst(a => a.cluster.id === id)
  )

export const topicsByClusterByIdSelector = (id: String) =>
  pipe(clusterByIdOptional(id), O.composeLens(topicLens))

export const initialConduktorState: ConduktorState = {
  clusterState: []
}
