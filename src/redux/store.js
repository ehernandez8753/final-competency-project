// import { createStore, applyMiddleware } from "redux";
// import promiseMiddleware from "redux-promise-middleware";
// import userReducer from "./userReducer.js";
// import { combineReducers } from "redux";

// // const rootReducer = combineReducers({
// //     user: userReducer,
// //     allLocations: locationsReducer,
// //     allRewards: rewardsReducer
// // })

// export default createStore(userReducer,  (applyMiddleware(promiseMiddleware)));

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer.js";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
export default createStore(userReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(promiseMiddleware),
  // other store enhancers if any
));