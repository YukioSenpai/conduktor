import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { translate } from "typed-intl"
import { useTranslator } from "../hooks/use-translator"

const LogoutMsg = translate({
    logout: 'Se déconnecter'
}).supporting('en', {
    logout: 'Log out'
})

export const LogoutButton: React.FC = () => {
    const { logout } = useAuth0()
    const msg = useTranslator(LogoutMsg)
    return (
        <button onClick={() => logout({ returnTo: 'http://localhost:8000' })}>
            {msg.logout}
        </button>
    )
}