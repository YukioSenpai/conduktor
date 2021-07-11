import axios from "axios";
import {nanoid} from "nanoid"

interface CreateCluster {
    name: string
}

export interface Cluster {
    name: string
    id: string
}

export interface Topic {
    name: string
}

export interface ConduktorService {
    createCluster: (cluster: CreateCluster) => Promise<void>
    listCluster: () => Promise<Cluster[]>
    createTopic: (clusterId: string, topic: Topic) => Promise<void>
    listTopic: (clusterId: string) => Promise<Topic[]>
    dataFromTopic: (clusterId: string, topic: string) => Promise<void>
}

export const axiosConduktorService: ConduktorService = ({
    createCluster: (cluster) => axios.post('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters', cluster),
    listCluster: () => axios.get('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters').then(res => res.data),
    createTopic: (clusterId, topic) => axios.post(`https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics`, topic),
    listTopic: (clusterId) => axios.get(`https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics`).then(res => res.data),
    dataFromTopic: (clusterId, topic) => axios.get(`https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics/${topic}/data`).then(res => res.data)
})

const buildMockConduktorService = () : ConduktorService => {
    const clusterState: Cluster[] = []
    const topicState: {[clusterId : string]: Topic[]} = {}
    return ({
        createCluster: (cluster) => {
            clusterState.push({id: nanoid(), name: cluster.name})
            return Promise.resolve()
        },
        listCluster: () => Promise.resolve(clusterState),
        createTopic: (clusterId, topic) => {
            const s = topicState[clusterId] || []
            s.push({ name: topic.name})
            topicState[clusterId] = s
            return Promise.resolve()
        },
        listTopic: (clusterId) => Promise.resolve(topicState[clusterId] || []),
        dataFromTopic: () => Promise.resolve()
    })
}
export const mockConduktorService : ConduktorService = buildMockConduktorService()