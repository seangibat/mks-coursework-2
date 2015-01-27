var Express = require('express');
var app = Express();
var bodyParser = require('body-parser');
var userRouter = require('./routes/users.js')(app);
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req,res,next){
  var is_ajax_request = req.xhr;
  var is_image = req.url.substr(0,8) === "/images/" ? true : false;
  if (is_ajax_request && is_image) return res.send("No ajax for you!");
  next();
});

app.use(Express.static(__dirname+"/static"));

app.use('/users', userRouter);

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.json(err);
// });

app.all("/*", function(req,res){
  res.send("404!");
});

var port = "8080";
var server = app.listen(port);
console.log('Example app listening at http://127.0.0.1:%s', port);