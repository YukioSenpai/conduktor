import { Lens } from 'monocle-ts'
import { Cluster } from '../business/cluster'

export interface ConduktorState {
    clusterState: ReadonlyArray<Cluster>
}

export const clusterLens = Lens.fromProp<ConduktorState>()('clusterState')

export const initialConduktorState: ConduktorState = {
    clusterState: []
}