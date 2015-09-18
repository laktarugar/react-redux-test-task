/* eslint-disable no-console, no-use-before-define */

import path from 'path';
import Express from 'express';
import qs from 'qs';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import UserApp from '../common/containers/UserApp';
import { fetchCounter } from '../common/api/counter';

import User from '../common/model/User';
import { defaultState } from '../common/reducers/userReducer.js'

const app = new Express();
const port = 3000;

// Use this middleware to server up static files built into dist
app.use(require('serve-static')(path.join(__dirname, '../dist')));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {

  //console.log(res);

  let newUser = new User('', 'test@test.test');


  // Read the counter from the request, if provided
  const params = qs.parse(req.query);
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
