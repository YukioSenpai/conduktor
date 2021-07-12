import { createBrowserHistory } from 'history'
import env from '@beam-australia/react-env'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { ConduktorActions } from './conduktor.actions'
import { conduktorReducer } from './conduktor.reducer'
import { ConduktorState } from './conduktor.state'

export type Actions = ConduktorActions

export interface State {
    conduktor: ConduktorState
}

export const epicMiddleware = createEpicMiddleware<Actions, Actions, State>()

const middlewares = env('ENV') === 'production' ? [epicMiddleware] : [epicMiddleware, logger]

export const history = createBrowserHistory()

export const store = createStore<State, Actions, unknown, unknown>(
    combineReducers<State>({
        conduktor: conduktorReducer
    }),
    composeWithDevTools(applyMiddleware(...middlewares))
)