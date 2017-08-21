import React from 'react'
import {render} from 'react-dom'
import TicTacToe from './components/TicTacToe'

import {Provider} from 'react-redux'
import store from './store'

render(<Provider store = {store}><TicTacToe /></Provider>, document.querySelector('#mount-point'))