import axios from 'axios'
import { constVoid } from 'fp-ts/lib/function'
import { nanoid } from 'nanoid'
import { Cluster } from '../business/cluster'
import { Topic } from '../business/topic'

interface CreateCluster {
  name: string
}

export interface Closable {
  close: () => void
}

export const emptyClosable: Closable = { close: constVoid }

export interface ConduktorService {
  createCluster: (token: String, cluster: CreateCluster) => Promise<Cluster>
  listCluster: (token: String) => Promise<Cluster[]>
  createTopic: (token: String, clusterId: string, topic: Topic) => Promise<Topic>
  listTopic: (token: String, clusterId: string) => Promise<Topic[]>
  listenTopicData: (token: String, clusterId: string, topic: string, onmessage: (e: string) => void) => Closable
}

const buildMockConduktorService = (): ConduktorService => {
  const clusterState: Cluster[] = []
  const topicState: { [clusterId: string]: Topic[] } = {}
  return {
    createCluster: (token,cluster) => {
      const created: Cluster = { id: nanoid(), name: cluster.name }
      clusterState.push(created)
      return Promise.resolve(created)
    },
    listCluster: (token) => Promise.resolve(clusterState),
    createTopic: (token, clusterId, topic) => {
      const s = topicState[clusterId] || []
      const created = { name: topic.name }
      s.push(created)
      topicState[clusterId] = s
      return Promise.resolve(created)
    },
    listTopic: (token, clusterId) => Promise.resolve(topicState[clusterId] || []),
    listenTopicData: (token, clusterId, topic, onmessage) => {
      const int = setInterval(() => onmessage(nanoid(10)), 1000)
      return { close: () => clearInterval(int) }
    }
  }
}


/** Can be used to validate the request type match the openapi + validate the token is present */
const axiosConduktorService: ConduktorService = {
  createCluster: (token, cluster) =>
    axios
      .post('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters', cluster, {
        headers: {
            Authorization: `Bearer ${token}`,
          }
      })
      .then(res => res.data),
  listCluster: (token) =>
    axios
      .get('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters', {
        headers: {
            Authorization: `Bearer ${token}`,
          }
      })
      .then(res => res.data),
  createTopic: (token, clusterId, topic) =>
    axios
      .post(
        `https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics`,
        topic, {
            headers: {
                Authorization: `Bearer ${token}`,
              }
          }
      )
      .then(res => res.data),
  listTopic: (token, clusterId) =>
    axios
      .get(
        `https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics`, {
            headers: {
                Authorization: `Bearer ${token}`,
              }
          }
      )
      .then(res => res.data),

  listenTopicData: (token, clusterId, topic, onmessage) => {
    //not a real sse endpoint
    //EventSource doesnn't accept auth headers, so it is passed as a query string
    const sse = new EventSource(
      `https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics/${topic}/data?token=${token}`,
    )

    //should decode data to the expected type before calling onMessage
    sse.onmessage = e => onmessage(e.data)

    return sse
  }
}

/** mocked service that keep a state locally */
const mockConduktorService: ConduktorService = buildMockConduktorService()

export const conduktorService: ConduktorService = mockConduktorService
