import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {reducer as userReducer} from './module/user'
import {reducer as preferentialReducer} from './module/preferential'
import {reducer as placeInfoReducer} from './module/placeInfo'
import {reducer as layoutReducer} from './module/layout'

let reducers = combineReducers({
    userReducer,
    preferentialReducer,
    placeInfoReducer,
    layoutReducer
})

// let reducers: Reducer<IStoreState, IAction<any>> = combineReducers<IStoreState>({
//     user
// })

// function createMyStore() {
//     /* eslint-disable no-underscore-dangle */
//     const store = window.__REDUX_DEVTOOLS_EXTENSION__
//       ? createStore(
//           reducers,
//           compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__({})),
//         )
//       : createStore(reducers, applyMiddleware(thunk));
  
//     return store;
// }

const store = createStore(reducers, applyMiddleware(thunk))

export default store
