import React from 'react'
import {render} from 'react-dom'
import TicTacToe from './components/TicTacToe'
import {IntlProvider, addLocaleData} from 'react-intl'

const translationLanguages = require('../translationLanguages').default

import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'

addLocaleData([...en, ...ru])

import {Provider} from 'react-redux'
import store from './store'

translationLanguages.forEach(lang => {
  console.info('Lang', lang)
})

const locale = store.getState().game.locale

render(
  <Provider store = {store}>
    <IntlProvider key={locale} locale={locale}>
      <TicTacToe />
    </IntlProvider>
  </Provider>,
  document.querySelector('#mount-point')
)