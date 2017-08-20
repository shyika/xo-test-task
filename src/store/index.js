import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer'

import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'

import logger from '../middlewares/logger'
import game from '../middlewares/game'

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger, game)

const store = createStore(reducer, {}, enhancer)

//Dev only
window.store = store

export default store