import { Layout as L, Space } from 'antd'
import React from 'react'
import { stylesheet } from 'typestyle'
import { useSetLocale } from '../framework/locale-context'
import { Locale } from '../models/locale'

const {Header, Content} = L

const css = stylesheet({
    layout: {
        height: '93vh',
        textAlign: 'center'
    },
    header: {
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flags: {
        fontSize: '2rem',
        cursor: 'pointer'
    },
    logo: {
        width: 'auto',
        height: '1.5rem'
    }
  })

export const Layout: React.FC = ({children}) => {
    const setLocale = useSetLocale()
    return (
        <>
            <Header className={css.header}>
                <div />
                <img src='https://www.conduktor.io/uploads/conduktor.svg' alt='' className={css.logo}/>
                <div>
                <Space>
                    <span onClick={() => setLocale(Locale.wrap('fr'))} className={css.flags}>🇫🇷</span>
                    <span>/</span>
                    <span onClick={() => setLocale(Locale.wrap('en'))} className={css.flags}>🇬🇧</span>
                </Space>
                </div>
            </Header>
            <L className={css.layout}>
                <Content>
                    {children}
                </Content>
            </L>
        </>
    )
}
