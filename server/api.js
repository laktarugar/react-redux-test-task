/**
 * Created by alexanderklimenko on 9/18/15.
 */


/* eslint-disable no-console, no-use-before-define */

import path from 'path';
import Express from 'express';
import qs from 'qs';

import config from '../common/config';
import userRouter from './user';

const app = new Express();
const port = config.apiPort;


app.use('/api/user', userRouter);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
