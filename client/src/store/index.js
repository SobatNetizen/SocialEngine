import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import rnmreducer from './history/history.reducer'
// import dotaReducer from './dota/dota.reducer';

const rootReducer = combineReducers({
  history: rnmreducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
) 

export default store