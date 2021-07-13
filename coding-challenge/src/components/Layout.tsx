import { Layout as L } from 'antd'
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
        justifyContent: 'space-between'
    }
  })

export const Layout: React.FC = ({children}) => {
    const setLocale = useSetLocale()
    return (
        <>
            <Header className={css.header}>
                <div />
                <img src='https://www.conduktor.io/uploads/conduktor.svg' alt='' />
                <div>
                <span onClick={() => setLocale(Locale.wrap('fr'))}>🇫🇷</span>
                <span onClick={() => setLocale(Locale.wrap('en'))}>🇬🇧</span>
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
