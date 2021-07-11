import { Button, Collapse, Input, Space } from 'antd'
import React, { useState } from 'react'
import { stylesheet } from 'typestyle'
import { CaretRightOutlined } from '@ant-design/icons'
import { Cluster, mockConduktorService, Topic } from '../service/conduktorService'
import { translate } from 'typed-intl'
import { useTranslator } from '../hooks/use-translator'

const { Panel } = Collapse

const FetchMsg = translate({
    cluster: 'Créer un groupe :',
    add: 'Ajouter',
    topic: (cluster: string) =>`Créer un sujet dans le groupe ${cluster} :`
}).supporting('en', {
    cluster: 'Enter a cluster :',
    add: 'Add',
    topic: (cluster: string) => `Enter a topic in the cluster ${cluster}:`
})

const css = stylesheet({
    container: {
        marginTop: '5rem'
    },
    input: {
        width: '10rem'
    },
    collapse: {
        width: '30rem',
        marginTop: '3rem' 
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    }
})

export const FetchingData: React.FC = () => {
    const msg = useTranslator(FetchMsg)

    const [clusters, setClusters] = useState<Cluster[]>()
    const [topics, setTopics] = useState<Topic[]>()

    const [cluster, setCluster] = useState('')
    const [topic, setTopic] = useState('')

    const clusterAction = (cluster: string) => {
        mockConduktorService.createCluster({name: cluster})
        mockConduktorService.listCluster().then(res => setClusters(res))
    }

    const topicAction = (id: string, topic: string) => {
        mockConduktorService.createTopic(id, {name: topic})
        mockConduktorService.listTopic(id).then(res => setTopics(res))
    }

    return (
        <div className={css.container}>
            <Space direction='vertical'>
                <Space>
                    <span>{msg.cluster}</span>
                    <Input value={cluster} onChange={e => setCluster(e.target.value)} className={css.input} />
                    { cluster !== '' && 
                        <Button onClick={() => clusterAction(cluster)}>{msg.add}</Button>
                    }
                </Space>
            </Space>
            <div className={css.center}>
                {clusters && 
                    <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className={css.collapse}
                    >
                        {clusters.map((cluster) =>
                            <Panel header={cluster.name} key={cluster.id} className="site-collapse-custom-panel">
                                <Space>
                                    <span>{msg.topic(cluster.name)}</span>
                                    <Input value={topic} onChange={e => setTopic(e.target.value)} className={css.input} />
                                    { topic !== '' && 
                                        <Button onClick={() => topicAction(cluster.id, topic)}>{msg.add}</Button>
                                    }
                                </Space>
                            </Panel>
                        )}
                    </Collapse>
                }
            </div>
            {topics && <div>topic : {topics.map((topic, i) => <div key={i}><div>{topic.name}</div></div>)}</div>}
        </div>
    )
}
