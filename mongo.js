var express = require('express')
var app = express()

// dburl to a mongodb server hosted in the cloud (i.e., mongolab)
var dburl = 'mongodb://github:1234@ds041871.mongolab.com:41871/github'

// get db
var db = require('monk')(dburl)

// set the database
app.db = db

// use jade as the view engine
app.set('view engine', 'jade');

// set where the static contents are (e.g., css, js)
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index.jade');
})

require('./mongo/repoList')(app)
require('./mongo/repoView')(app)
require('./mongo/eventList')(app)
require('./mongo/eventView')(app)

var server = app.listen(process.env.PORT || 3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('App listening at http://%s:%s', host, port)
})
