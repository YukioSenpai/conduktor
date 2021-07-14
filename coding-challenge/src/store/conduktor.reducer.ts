import { ConduktorActions } from './conduktor.actions'
import { clusterByIdOptional, topicLens, clusterLens, initialConduktorState } from './conduktor.state'
import {pipe} from 'fp-ts/lib/function'
import * as O from 'monocle-ts/Optional'

export const conduktorReducer = ConduktorActions.createReducer(initialConduktorState)({
    CreateCluster: (c) => clusterLens.modify(l => l.concat({cluster: c.cluster, topicState: []})),
    CreateTopic: (c) => pipe(
        clusterByIdOptional(c.clusterId),
        O.modify(topicLens.modify( t => t.concat(c.topic)))
        )
})