import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import historyreducer from './history/history.reducer'
import userreducer from './user/user.reducer'
// import dotaReducer from './dota/dota.reducer';

const rootReducer = combineReducers({
  history: historyreducer,
  user: userreducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
) 

export default store