import { CaretRightOutlined } from '@ant-design/icons'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Collapse, Input, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { translate } from 'typed-intl'
import { stylesheet } from 'typestyle'
import { useTranslator } from '../hooks/use-translator'
import { conduktorService } from '../service/conduktorService'
import { ConduktorActions } from '../store/conduktor.actions'
import { conduktorLens, store } from '../store/store'
import { TopicPanel } from './TopicPanel'

const { Panel } = Collapse

const ConduktorPanelMsg = translate({
  cluster: 'Créer un groupe :',
  add: 'Ajouter'
}).supporting('en', {
  cluster: 'Enter a cluster :',
  add: 'Add'
})

const css = stylesheet({
  container: {
    marginTop: '5rem'
  },
  input: {
    width: '10rem'
  },
  collapse: {
    width: '40rem',
    marginTop: '3rem'
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export const ConduktorPanel: React.FC = () => {
  const msg = useTranslator(ConduktorPanelMsg)
  const conduktor = useSelector(conduktorLens.get)
  const { getAccessTokenSilently } = useAuth0()

  const [cluster, setCluster] = useState('')

  const clusterAction = async (name: string) => {
    const token = await getAccessTokenSilently()
    conduktorService
      .createCluster(token, { name })
      .then(cluster => store.dispatch(ConduktorActions.build({ cluster, type: 'CreateCluster' })))
  }

  useEffect(() => {
    getAccessTokenSilently().then(token => conduktorService.listCluster(token))
  }, [])

  return (
    <div className={css.container}>
      <Space direction="vertical">
        <Space>
          <span>{msg.cluster}</span>
          <Input value={cluster} onChange={e => setCluster(e.target.value)} className={css.input} />
          {cluster !== '' && <Button onClick={() => clusterAction(cluster)}>{msg.add}</Button>}
        </Space>
      </Space>
      <div className={css.center}>
        {conduktor.clusterState && (
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className={css.collapse}
            defaultActiveKey={[0]}
          >
            {conduktor.clusterState.map(cluster => (
              <Panel
                header={cluster.cluster.name}
                key={cluster.cluster.id}
                className="site-collapse-custom-panel"
              >
                <TopicPanel cluster={cluster.cluster} />
              </Panel>
            ))}
          </Collapse>
        )}
      </div>
    </div>
  )
}
