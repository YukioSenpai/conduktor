import { Button, Collapse, Input, Space } from 'antd'
import React, { useRef, useState } from 'react'
import { stylesheet } from 'typestyle'
import { CaretRightOutlined } from '@ant-design/icons'
import { mockConduktorService, Topic } from '../service/conduktorService'
import { translate } from 'typed-intl'
import { useTranslator } from '../hooks/use-translator'
import * as A from 'fp-ts/Array'
import { useSelector } from 'react-redux'
import { clusterLens } from '../store/conduktor.state'
import { Cluster } from '../business/cluster'

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
    const collapseRef = useRef<HTMLDivElement>(null)

    const clustersssss = useSelector(clusterLens.get)
    console.log(clustersssss)
    // const [data, setData] = React.useState([] as any)

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

    // const sse = (clusterId: string, topic: string) => {
    //    const event = new EventSource(`https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/${clusterId}/topics/${topic}/data`, { withCredentials: true })
    //    const updateProdutList = (product: any) => {
    //     setData([...product])
    //    }
    //    event.onmessage = e => updateProdutList(JSON.parse(e.data))
    //    event.onerror = () => {
    //      sse.close();
    //    }
    //    console.log(data)
    // }

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
                        defaultActiveKey={[0]}
                    >
                        {clusters.map((cluster, i) =>
                            <Panel header={cluster.name} key={i} className="site-collapse-custom-panel">
                                <Space>
                                    <span ref={collapseRef}>{msg.topic(cluster.name)}</span>
                                    <Input value={topic} onChange={e => setTopic(e.target.value)} className={css.input} />
                                    { topic !== '' && 
                                        <Button onClick={() => topicAction(cluster.id, topic)}>{msg.add}</Button>
                                    }
                                </Space>
                                {/* <Button onClick={() => sse(cluster.id, topic)}>test sse</Button> */}
                            </Panel>

                        )}
                    </Collapse>
                }
            </div>
            {topics && <div>topic : {topics.map((topic, i) => <div key={i}><div>{topic.name}</div></div>)}</div>}
            {clusters && A.isNonEmpty(clusters) && topic !== '' ? <Button onClick={() => mockConduktorService.createTopic(clusters[0].id, {name: topic}).then(res => console.log(res))}>test</Button> : null}
            
        </div>
    )
}
