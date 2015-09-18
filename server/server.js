/* eslint-disable no-console, no-use-before-define */

import path from 'path';
import Express from 'express';
import bodyParser  from 'body-parser';
import qs from 'qs';

import React from 'react';
import { Provider } from 'react-redux';

import ApiClient from '../common/api/ApiClient';
import configureStore from '../common/store/configureStore';
import UserApp from '../common/containers/UserApp';
import { fetchCounter } from '../common/api/counter';

import User from '../common/model/User';
import { addWithCheck } from '../common/actions/user';
import { defaultState } from '../common/reducers/userReducer.js'

const app = new Express();
const port = 3000;

import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({target: "http://localhost:3002"});

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// Use this middleware to server up static files built into dist
app.use(require('serve-static')(path.join(__dirname, '../dist')));

app.use(function (req, res, next) {
  if (/^\/api/.test(req.url)) {
    proxy.proxyRequest(req, res);
  } else {
    next();
  }
})

app.post('/', function (req, res) {
  let newUser = new User(req.body.name, req.body.email);
  const initialState = {
    user: Object.assign({}, defaultState, {
      newUser,
      list: [
        {name: 123, email: 'test1@test.com'},
        {name: 444, email: 'test2@test.com'},
      ]
    })
  };

  // Create a new Redux store instance
  const store = configureStore(initialState);

  store.dispatch(addWithCheck(newUser))
    .catch(
      (data) => {
        console.error('some error', data);
        Promise.resolve();
      }
    )
    .then(() => renderResponse(store, res));

});

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  let newUser = new User('', 'test@test.test');
  // Compile an initial state
  const initialState = {
    user: Object.assign({}, defaultState, {
      newUser,
      list: [
        {name: 123, email: 'test1@test.com'},
        {name: 444, email: 'test2@test.com'},
      ]
    })
  };

  // Create a new Redux store instance
  const store = configureStore(initialState);

  renderResponse(store, res);
}

function renderResponse(store, res) {

  // Render the component to a string
  const html = React.renderToString(
    <Provider store={store}>
      { () => <UserApp/>}
    </Provider>);

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
