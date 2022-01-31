// store.ts

import { createStore, AnyAction, Store, applyMiddleware } from 'redux';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";

export interface User {
  uid?: string,
  name?: string
}

export interface State {
  user?: User;
}

// create your reducer
const reducer = (state: State = { user: {} }, action: AnyAction) => {
  console.log(action)
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

// create a makeStore function
const makeStore = wrapMakeStore(() => createStore(reducer, bindMiddleware([nextReduxCookieMiddleware({
  subtrees: ["user"],
})])));

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });