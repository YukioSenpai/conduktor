import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { translate } from "typed-intl"
import { useTranslator } from "../hooks/use-translator"
import { stylesheet } from "typestyle"
import {LocalTime} from 'js-joda'
import { compareDateEn, compareDateFr } from "../core/utils/compareDate"
import { Space } from "antd"

const css = stylesheet({
    presentation: {
        fontSize: '1.5rem',
        fontWeight: 300,
        marginTop: '3rem'
    },
    img: {
        width: '4rem',
        height: '4rem',
        borderRadius: '50%'
    }
})

const UserMsg = translate({
    whoami: (name: string, hour: number) => `${compareDateFr(hour)} ${name}, ravie te de rencontrer, voici tes informations :`
}).supporting('en', {
    whoami: (name: string, hour: number) => `${compareDateEn(hour)} ${name}, i'm happy to meet you, here is your informations :`
})

export const UserInfo: React.FC = () => {
    const { user } = useAuth0()
    const msg = useTranslator(UserMsg)
    const hour = LocalTime.now().hour()

    return (
        <div>
            { user && (
                <Space size={20} direction='vertical'>
                    <div className={css.presentation}>{msg.whoami(user.name ? user.name : '', hour)}</div>
                    <img src={user.picture} alt={user.name} className={css.img} />
                    <h2>{user.name}</h2>
                </Space>
            )}
        </div>
    )
}