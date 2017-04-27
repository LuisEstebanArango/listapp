var express = require('express');
var router = express.Router();

// packages
var _ = require('lodash');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  console.log(req.decoded);
  res.json(req.app.locals.data);
});

router.get('/:id', function(req, res) {
  res.json(_.find(req.app.locals.data.users, function(o) { return o.id == req.params.id; }));
});

router.post('/', function(req, res){
  var lastId = req.app.locals.data.users.length == 0 ? 0 : _.last(req.app.locals.data.users).id;
  var user = {
    "id": parseInt(lastId) + 1,
    "username": req.body.username,
    "password": req.body.password,
    "state": 1
  };
  req.app.locals.data.users.push(user)
  req.app.locals.writeData();
  res.send(user);
});

router.delete('/:id', function(req, res){
  var user = _.find(req.app.locals.data.users, function(o) { return o.id == req.params.id; });
  _.remove(req.app.locals.data.users, function(o) {
    return o.id == user.id;
  });
  req.app.locals.writeData();
  res.send(user);
});

module.exports = router;

