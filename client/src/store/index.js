import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// import historyreducer from './history/history.reducer'
import userreducer from './user/user.reducer'
import dashreducer from './dashboard/dashboard.reducer'
// import dotaReducer from './dota/dota.reducer';

const rootReducer = combineReducers({
  user: userreducer,
  dashboard: dashreducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
) 

export default store