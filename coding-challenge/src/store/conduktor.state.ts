import { Cluster } from 'cluster'
import { Lens } from 'monocle-ts'

export interface ConduktorState {
    clusterState: Cluster[]
}

export const clusterLens = Lens.fromProp<ConduktorState>()('clusterState')

export const initialConduktorState: ConduktorState = {
    clusterState: []
}