import { Layout as L } from 'antd'
import React from 'react'
import { stylesheet } from 'typestyle'

const {Header, Content} = L

const css = stylesheet({
    layout: {
        height: '93vh',
        textAlign: 'center'
    },
    header: {
        backgroundColor: '#fff',
        textAlign: 'center'
    }
  })

export const Layout: React.FC = ({children}) => {
    return (
        <>
            <Header className={css.header}>
                <img src='https://www.conduktor.io/uploads/conduktor.svg' alt='' />
            </Header>
            <L className={css.layout}>
                <Content>
                    {children}
                </Content>
            </L>
        </>
    )
}
