import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "antd"
import { translate } from "typed-intl"
import { useTranslator } from "../hooks/use-translator"
import { stylesheet } from "typestyle"
import { PrimaryButton } from "./PrimaryButton"

const LoginMsg = translate({
    login: 'Connexion',
    hello: `Bonjour tout le monde, connectez-vous pour accéder au contenu de l'application ! 😃`
}).supporting('en', {
    login: 'Log in',
    hello: 'Hello everyone, log in to access the content of the application ! 😃'
})

const css = stylesheet({
    button: {
        marginTop: '2rem',
        width: '50%'
    },
    container: {
        marginTop: '15rem',
        maxWidth: '650px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    greetings: {
        fontSize: '2rem',
        fontWeight: 500
    }
})
export const LoginButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0()
    const msg = useTranslator(LoginMsg)
    return (
        <div className={css.container}>
            <div className={css.greetings}>{msg.hello}</div>
            <PrimaryButton className={css.button} size='large' onClick={() => loginWithRedirect()}>{msg.login}</PrimaryButton>
        </div>
    )
}