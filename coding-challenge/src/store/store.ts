import { createBrowserHistory } from 'history'
import { Lens } from 'monocle-ts'
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import { ConduktorActions } from './conduktor.actions'
import { conduktorReducer } from './conduktor.reducer'
import { ConduktorState } from './conduktor.state'

export type Actions = ConduktorActions

export interface State {
  conduktor: ConduktorState
}

export const epicMiddleware = createEpicMiddleware<Actions, Actions, State>()

const tabSyncMiddleware = createStateSyncMiddleware({})

const middlewares =
  process.env.ENV === 'production'
    ? [epicMiddleware, tabSyncMiddleware]
    : [epicMiddleware, tabSyncMiddleware, logger]

export const history = createBrowserHistory()

const rootReducers = combineReducers<State>({
  conduktor: conduktorReducer
})

export const store = createStore<State, Actions, unknown, unknown>(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
)

initStateWithPrevTab(store as unknown as Store<State, AnyAction>)

export const conduktorLens = Lens.fromProp<State>()('conduktor')
