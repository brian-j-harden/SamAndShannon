/**
 * Created by bharden on 9/11/14.
 */
var express     = require('express');
var exphbs      = require('express-handlebars');
var hbsConfig   = require( './config/hbs-config' );
var hbs         = exphbs.create( hbsConfig );
var app         = express();

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

// using express handlebars for templating
app.engine( 'handlebars', hbs.engine );
app.set('view engine', 'handlebars');
app.set('views_old', './views_old/');

// routing to templates
app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

app.get('/', function (req, res) {
    res.render('hello', { title: 'Hey', message: 'Hello there partner!'});
})

// routing in the event of a 500 error
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.render('error500', { error_message: 'Something broke!'});
});