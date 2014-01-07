var express = require('express')
    , httpProxy = require('http-proxy')
    , path = require('path');
		
var proxy = new httpProxy.RoutingProxy();
 
var proxyOptions = {
	host: 'api.openweathermap.org',
	port: 80
};
 
var app = express();
 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');

    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
      next();
    }
};
 
app.configure(function() {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(allowCrossDomain);
});
 
app.all('/*',  function (req, res) {
    return proxy.proxyRequest(req, res, proxyOptions);
});
 
app.listen(3333);
