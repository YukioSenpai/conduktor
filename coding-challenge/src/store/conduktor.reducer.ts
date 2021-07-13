import { ConduktorActions } from './conduktor.actions'
import { clusterLens, initialConduktorState } from './conduktor.state'

export const conduktorReducer = ConduktorActions.createReducer(initialConduktorState)({
    UpdateClusters: (c) => clusterLens.modify(l => l.concat(c.clusters))
})