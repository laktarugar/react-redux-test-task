/**
 * Created by alexanderklimenko on 9/17/15.
 */

import express from 'express';

let router = express.Router();

router.get('/', function (req, res) {
  let data = [
    {name: 123, email: 'test1@test.com'},
    {name: 444, email: 'test2@test.com'},
  ];

  res.send(JSON.stringify(data));
});

router.post('/', function () {

});

export default router;
