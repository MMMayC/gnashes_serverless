import React from "react"
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux"
import configureStore from "./redux/configureStore"
import Layout from "./layout";
import { StaticRouter } from "react-router-dom";


module.exports = function render(initialState, url) {
  // Configure the store with the initial state provided
  const store = configureStore(initialState)
  const context = {}

  // render the App store static markup ins content variable
  let content = renderToString(
    <Provider store={store} >
        <StaticRouter context={context} location={url}>
            <Layout />
        </StaticRouter>
    </Provider>
  );

  // Get a copy of store data to create the same store on client side 
  const preloadedState = store.getState()

  return {content, preloadedState};
}
