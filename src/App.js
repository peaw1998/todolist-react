import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducer from "./Reducer/index";
import { Router, Switch } from "react-router-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./Home";
import Edit from "./Edit";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/edit/:id" component={Edit} exact={true} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
