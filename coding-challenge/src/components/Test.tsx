import { Button } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { stylesheet } from 'typestyle'
import { useSetLocale } from '../framework/locale-context'

interface Cluster {
    id: string
    name: string
}

interface Topic {
    name: string
}

const css = stylesheet({
    container: {
        marginTop: '5rem'
    }
})

export const Test: React.FC = () => {
    const [clusters, setClusters] = useState<Cluster[]>()
    const [topics, setTopics] = useState<Topic[]>()
    const setLocale = useSetLocale()
    return (
        <div className={css.container}>
            <Button onClick={() => axios.post('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters', 'cluster1')}>post cluster</Button>
            <Button onClick={() => axios.get('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters').then((response) => {
                setClusters(response.data)
                console.log(response)
            })}>get clusters</Button>

            {clusters && <div>{`cluster : ${clusters.map(cluster => cluster.id)}`}</div>}

            <Button onClick={() => axios.post('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/1/topics', 'topic1')}>post topic</Button>
            <Button onClick={() => axios.get('https://virtserver.swaggerhub.com/YukioSenpai/challenge/1.0.0/clusters/1/topics').then((response) => {
                setTopics(response.data)
                console.log(response)
            })}>get topics</Button>
            {topics && <div>{`cluster : ${topics.map(topic => topic.name)}`}</div>}
            <Button onClick={() => setLocale()}>yoooo</Button>
        </div>
    )
}
