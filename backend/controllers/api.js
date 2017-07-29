var express = require('express');
var apiRoutes = express.Router();

// packages
var _    = require('lodash');
var jwt  = require('jsonwebtoken');
var path        = require('path');

apiRoutes.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../../frontend/app/index.html'));
});

apiRoutes.post('/authenticate', function(req, res) {
  var user = _.find(req.app.locals.data.users, function(user){ return user.username == req.body.username; });
  if(user){
    if (user.password != req.body.password) {
      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    } else {

      // if user is found and password is right
      // create a token
      var token = jwt.sign(user, 'superSecret', {
        expiresIn: 60 * 2 // expires in 24 hours 1440
      });

      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    }
  } else {
    res.json({ success: false, message: 'Authentication failed. User not found.' });
  }

});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-csrf-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});


module.exports = apiRoutes;
