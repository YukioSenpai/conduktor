import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { translate } from "typed-intl"
import { useTranslator } from "../hooks/use-translator"
import { Button, Space } from "antd"
import { stylesheet } from 'typestyle'

const LogoutMsg = translate({
    logout: 'Se déconnecter',
    disconnect: 'Tu veux te connecter avec un autre user ?'
}).supporting('en', {
    logout: 'Logout',
    disconnect: 'You want to login with an other user ?'
})

const css = stylesheet({
    button: {
        width: '8rem'
    },
    disconnect: {
        fontSize: '1.3rem',
        marginTop: '2rem',
        fontWeight: 300
    }
})

export const LogoutButton: React.FC = () => {
    const { logout, isAuthenticated } = useAuth0()
    const msg = useTranslator(LogoutMsg)

    const clickOnLogout = () => {
        localStorage.setItem('token', '')
        logout({ returnTo: 'http://localhost:8000' })
    }
    return (
        <Space align='end'>
            {isAuthenticated && 
                <>
                    <div className={css.disconnect}>{msg.disconnect}</div>
                    <Button onClick={clickOnLogout} className={css.button}>
                        {msg.logout}
                    </Button>
                </>
            }
        </Space>
    )
}