import { EyeTwoTone } from '@ant-design/icons'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Input, List, Space } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { isNonEmpty } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import React, { useEffect, useRef, useState } from 'react'
import { translate } from 'typed-intl'
import { stylesheet } from 'typestyle'
import { Cluster } from '../business/cluster'
import { Topic } from '../business/topic'
import { useSafeSelector } from '../hooks/use-selector'
import { useTranslator } from '../hooks/use-translator'
import { Closable, conduktorService, emptyClosable } from '../service/conduktorService'
import { ConduktorActions } from '../store/conduktor.actions'
import { topicsByClusterByIdSelector } from '../store/conduktor.state'
import { store } from '../store/store'

interface Props {
  cluster: Cluster
}

const css = stylesheet({
  container: {
    textAlign: 'start'
  },
  topics: {
    marginTop: '3rem'
  },
  input: {
    width: '10rem'
  },
  list: {
    display: 'flex',
    justifyContent: 'center'
  },
  listItem: {
    minWidth: '20rem'
  },
  listSSE: {
    display: 'flex',
    justifyContent: 'center'
  },
  modal: {
    $nest: {
      '.ant-modal-header': {
        textAlign: 'center'
      }
    }
  }
})

const TopicMsg = translate({
  topic: (cluster: string) => `Créer un topic dans le groupe ${cluster} :`,
  add: 'Ajouter',
  seeTopic: 'Topics :',
  consumeTopic: (topic: string) => `Consommer le topic ${topic}`,
  stopConsumming: 'Arrêter'
}).supporting('en', {
  topic: (cluster: string) => `Enter a topic in the cluster ${cluster} :`,
  add: 'Add',
  seeTopic: 'Topics :',
  consumeTopic: (topic: string) => `Consume ${topic} data`,
  stopConsumming: 'Stop'
})

export const TopicPanel: React.FC<Props> = ({ cluster }) => {
  const [topic, setTopic] = useState('')

  const { getAccessTokenSilently } = useAuth0()

  const topicsOption = useSafeSelector(topicsByClusterByIdSelector(cluster.id).getOption)
  const topics = pipe(
    topicsOption,
    O.map(a => a.concat()),
    O.getOrElse<Topic[]>(() => [])
  )

  const [visible, setVisible] = useState(false)
  const [datas, setDatas] = useState<string[]>([])
  const [subscription, setSubscription] = useState<Closable>(emptyClosable)

  const msg = useTranslator(TopicMsg)
  const collapseRef = useRef<HTMLDivElement>(null)
  const sseRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    sseRef.current?.scrollIntoView({ behavior: 'auto' })
  }

  const topicAction = async (id: string, topic: string) => {
    const token = await getAccessTokenSilently()
    conduktorService.createTopic(token, id, { name: topic }).then(topic => {
      store.dispatch(ConduktorActions.build({ topic, clusterId: id, type: 'CreateTopic' }))
    })
  }

  const showData = async (clusterId: string, topic: string) => {
    setVisible(true)
    const token = await getAccessTokenSilently()
    const sub = conduktorService.listenTopicData(token, clusterId, topic, a => {
      setDatas(datas => datas.concat(a))
    })
    setSubscription(sub)
  }

  const closeModal = () => {
    setVisible(false)
    subscription.close()
  }

  useEffect(() => {
    getAccessTokenSilently().then(token => conduktorService.listTopic(token, cluster.id))
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [datas])

  return (
    <div className={css.container}>
      <Space>
        <span ref={collapseRef}>{msg.topic(cluster.name)}</span>
        <Input value={topic} onChange={e => setTopic(e.target.value)} className={css.input} />
        {topic !== '' && <Button onClick={() => topicAction(cluster.id, topic)}>{msg.add}</Button>}
      </Space>
      {topics && (
        <div className={css.topics}>
          <span>{msg.seeTopic}</span>
          {isNonEmpty(topics) && (
            <List
              className={css.list}
              dataSource={topics}
              renderItem={topic => (
                <>
                  <List.Item className={css.listItem}>
                    <div>{topic.name}</div>
                    <EyeTwoTone
                      twoToneColor="#eb2f96"
                      onClick={() => showData(cluster.id, topic.name)}
                    />
                  </List.Item>
                  <Modal
                    title={msg.consumeTopic(topic.name)}
                    visible={visible}
                    destroyOnClose
                    onCancel={closeModal}
                    className={css.modal}
                    onOk={subscription.close}
                    okText={msg.stopConsumming}
                    bodyStyle={{ overflow: 'scroll', height: '400px', textAlign: 'center' }}
                  >
                    {isNonEmpty(datas) && (
                      <div className={css.listSSE}>
                        <List
                          dataSource={datas}
                          renderItem={data => (
                            <List.Item>
                              <div ref={sseRef}>{data}</div>
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                  </Modal>
                </>
              )}
            />
          )}
        </div>
      )}
    </div>
  )
}
