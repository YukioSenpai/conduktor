import { createBrowserHistory } from 'history'
import env from '@beam-australia/react-env'
import { applyMiddleware, combineReducers, createStore } from 'redux'
 import { createStateSyncMiddleware, initStateWithPrevTab, withReduxStateSync } from 'redux-state-sync';
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { ConduktorActions } from './conduktor.actions'
import { conduktorReducer } from './conduktor.reducer'
import { ConduktorState } from './conduktor.state'
import { Lens } from 'monocle-ts'
import {Store, AnyAction} from "redux"

export type Actions = ConduktorActions

export interface State {
    conduktor: ConduktorState

}

export const epicMiddleware = createEpicMiddleware<Actions, Actions, State>()

const tabSyncMiddleware = createStateSyncMiddleware({
})

const middlewares = env('ENV') === 'production' ? [epicMiddleware, tabSyncMiddleware] : [epicMiddleware, tabSyncMiddleware, logger]

export const history = createBrowserHistory()

const rootReducers = combineReducers<State>({
    conduktor: conduktorReducer
})


export const store = createStore<State, Actions, unknown, unknown>(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middlewares))
)

 initStateWithPrevTab(store as unknown as Store<State, AnyAction>);



export const conduktorLens = Lens.fromProp<State>()('conduktor')