import { Cluster } from 'cluster'
import { ConduktorActions } from './conduktor.actions'
import { clusterLens, initialConduktorState } from './conduktor.state'

export const conduktorReducer = ConduktorActions.createReducer(initialConduktorState)({
    ShowClusters: () => clusterLens.set([])
})