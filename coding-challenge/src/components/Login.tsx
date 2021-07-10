import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "antd"
import { translate } from "typed-intl"
import { useTranslator } from "../hooks/use-translator"

const LoginMsg = translate({
    login: 'connexion'
}).supporting('en', {
    login: 'Log in'
})

export const LoginButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0()
    const msg = useTranslator(LoginMsg)
    return <Button onClick={() => loginWithRedirect()}>{msg.login}</Button>
}