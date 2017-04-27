var config = {};

config.env = 'development';

// development enviorement
config.development = {};
config.development.hostname = 'dev.example.com';

//---------------- mongo database
config.development.mongo_uri = process.env.MONGO_URI || 'localhost';
config.development.mongo_db = 'example_dev';

config.development.web_port = process.env.WEB_PORT || 3000;

config.get = function (name) {
  if ( config.env == 'development' ){
    return config.development[name];
  } else if ( config.env == 'production' ) {
    return config.production[name];
  } else{ // pruebas
    return config.tests[name];
  };
}

module.exports = config;

