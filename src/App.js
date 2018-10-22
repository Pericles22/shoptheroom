import React, { Component } from 'react'
import './app.css'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './components/store'

import Main from './components/Main'

const store = configureStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <Main />
        </div>
      </Provider>
    )
  }
}

export default hot(module)(App)
