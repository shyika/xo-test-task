import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer'

import thunk from 'redux-thunk'

import logger from '../middlewares/logger'

const enhancer = applyMiddleware(thunk, logger)

const store = createStore(reducer, {}, enhancer)

//Dev only
window.store = store

export default store