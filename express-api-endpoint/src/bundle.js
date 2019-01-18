import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import "./style/index.less"
import Layout from "./layout";
import { BrowserRouter } from "react-router-dom";

// Create a fresh store 
const store = configureStore()


render(
  <Provider store={store} >
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
