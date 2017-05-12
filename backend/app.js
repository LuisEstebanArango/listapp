var express = require("express");
var app = express();
var http = require('http').Server(app);

// packages
var fs          = require('fs');
var _           = require('lodash');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');
var path        = require('path');// path para utilizar /../ en la ruta del sendFile
var rfs         = require('rotating-file-stream')

// Archivos de configuracion
var config = require('./config/config');

// para servir los archivos estaticos
app.use('/bower', express.static(path.resolve(__dirname + '/../frontend/bower_components')));
app.use('/css', express.static(path.resolve(__dirname + '/../frontend/app/styles')));
app.use('/scripts', express.static(path.resolve(__dirname + '/../frontend/app/scripts')));
app.use('/fonts', express.static(path.resolve(__dirname + '/../frontend/app/fonts')));
app.use('/images', express.static(path.resolve(__dirname + '/../frontend/app/images')));

// get an instance of the express Router
var router = express.Router();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(methodOverride());


var logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));


//data
app.locals.readData = function(){
  fs.readFile('./data', 'utf8', function (err,dat) {
    if (err)
      app.locals.data = err;
    else
      app.locals.data = JSON.parse(dat);
  });
};
app.locals.writeData = function(){
  fs.writeFile("./data", JSON.stringify(app.locals.data, null, '\t'), function(err) {
    if(err)
        app.locals.data = err;
    else
        app.locals.data = app.locals.data;
  });
}
app.locals.readData();

// Login
router.get('/', function(req, res) {
    // res.send(data);
    // app.locals.title = 'My App';
    // app.set('luis', true);
    // console.log(app.get('luis'));
    // app.disable('luis');
    // console.log(app.locals);
    res.sendFile(path.resolve(__dirname + '/../frontend/app/index.html'));
});

router.get('/views/*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../frontend/app'+req.path));
});

// Routes
app.use('/api', require('./controllers/api'));
app.use('/api/users', require('./controllers/users'));
app.use('', router);

http.listen(config.get('web_port'), function(){
  console.log('listening on *:3000');
});
