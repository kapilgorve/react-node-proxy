const http = require('http'),
httpProxy = require('http-proxy'),
express = require('express'),
cors = require('cors')
proxy = require('express-http-proxy')

app = express();
app.use(cors());


app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/build'));
//app.use("/fonts", express.static(__dirname + '/fonts'));
app.use('/static', express.static(__dirname + '/build/static'));

// views is directory for all template files
app.set('views', __dirname + '/build');
app.set('view engine', 'html');

// add your target proxy url
app.use('/api', proxy('http://34.70.207.212:8080'));

app.get('/*', function(req, res) {
  console.log(req.url);
  res.sendFile(__dirname + '/build/index.html');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});