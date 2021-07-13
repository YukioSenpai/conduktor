import axios from "axios";
import {nanoid} from "nanoid"
import { Cluster } from "../business/cluster";
import { ConduktorActions } from "../store/conduktor.actions"
import { store } from "../store/store"

interface CreateCluster {
    name: string
}

export interface Topic {
    name: string
}

export interface ConduktorService {
    createCluster: (cluster: CreateCluster) => Promise<void>
    listCluster: () => Promise<Cluster[]>
    createTopic: (clusterId: string, topic: Topic) => Promise<void>
    listTopic: (clusterId: string) => Promise<Topic[]>
}

export const axiosConduktorService: ConduktorService = ({
    createCluster: (cluster) => axios.post('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters', cluster),
    listCluster: () => axios.get('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters').then(res => res.data),
    createTopic: (clusterId, topic) => axios.post(`https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics`, topic),
    listTopic: (clusterId) => axios.get(`https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics`).then(res => res.data)
})

const buildMockConduktorService = () : ConduktorService => {
    const clusterState: Cluster[] = []
    const topicState: {[clusterId : string]: Topic[]} = {}
    return ({
        createCluster: (cluster) => {
            store.dispatch(ConduktorActions.build({clusters: [{id: nanoid(), name: cluster.name}], type: 'UpdateClusters'}))
            return Promise.resolve()
        },
        listCluster: () => Promise.resolve(clusterState),
        createTopic: (clusterId, topic) => {
            const s = topicState[clusterId] || []
            s.push({ name: topic.name})
            topicState[clusterId] = s
            return Promise.resolve()
        },
        listTopic: (clusterId) => Promise.resolve(topicState[clusterId] || [])
    })
}
export const mockConduktorService : ConduktorService = buildMockConduktorService()