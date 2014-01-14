/**
 * Module dependencies.
 */

var express   = require('express'),
    crypto = require('crypto'),
    https = require('https'),
    http = require('http'),
    request	= require('request'),
    path = require('path'),
    app = module.exports = express();

var sessions = [];

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('change this value to something unique'));
app.use(express.cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 }}));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, './build')));
app.use(app.router);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('*', function(req, res) {
    res.send(200);
});

module.exports = app.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});














var proxy = express();

proxy.use(express.json());
proxy.use(express.urlencoded());
proxy.use(express.methodOverride());

proxy.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept, proxy");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

proxy.use(proxy.router);

var proxyRequest = function(req, res) {
    var options = {
        url:'http://198.101.239.68:8080'+req.url,
        method: req.method,
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        }
    };

    // if(req.headers.proxy) {
    //     console.log('proxy header');
    //     options.url = req.headers.proxy+req.url;
    //     req.body.username='demouser';
    //     req.body.password='m04rcl0ud$';
    // }
    console.log(options.url);
    // console.log('HEADERS:');
    // console.log(req.headers);

    if(req.method == 'POST') {
        options.json = req.body;
        // console.log('looking at req body...');
        // console.log(req.body);
    };
    if(req.method == 'PUT') {
        options.json = req.body;
    }; 
    if(req.headers['x-auth-token']) {
        options.headers['x-auth-token'] = req.headers['x-auth-token'];
    };

    console.log('Proxing to: ' + options.url);
    // console.dir(options);
    
    request(options, function (error, response, body) {
        // console.log(body);
        if (!error && response.statusCode == 200) {
            // var output = JSON.parse(body);
            // console.log(req.url+' - '+response.statusCode);
            // console.log(body);
            res.send(body);
        } else {
            console.log('error');
            // console.dir(error);
            // console.dir(body);
            res.send(response.statusCode);

        }
    });
};

proxy.get('*', function(req, res) {
    proxyRequest(req, res);	
});
proxy.post('*', function(req, res) {
    proxyRequest(req, res); 
});
proxy.put('*', function(req, res) {
    proxyRequest(req, res); 
});


//
// Basic Http Proxy Server
//
// httpProxy.createServer(9000, 'localhost').listen(3000);

proxy.listen(4000);
console.log('Proxy Listening on port 4000');