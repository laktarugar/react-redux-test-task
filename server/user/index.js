/**
 * Created by alexanderklimenko on 9/17/15.
 */

import express from 'express';

let router = express.Router();
let id = 3;
let data = [
  { id: 1, name: 123, email: 'test1@test.com'},
  { id: 2, name: 444, email: 'test2@test.com'},
];

router.get('/', function (req, res) {
  res.send(JSON.stringify(data));
});

router.post('/', function (req, res) {
  let user = req.body;

  if (!checkUniqueName(user.name)) {
    return res.send(JSON.stringify(user));
  } else {
    return res.send(406, JSON.stringify({
      name: ['No unique value']
    }));
  }

});

export default router;


function checkUniqueName(name) {

  let findResult = data.find((value) => {
    return value.name == name;
  });

  if (!!findResult) {
    return true;
  }

  return false;

}
