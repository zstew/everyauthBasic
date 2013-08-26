var application_root = __dirname,
    express = require("express"),
    path = require("path")
var url = require('url'), path = require('path');
var app = express();
var everyauth = require('everyauth');
var passport = require("passport")
var fs = require("fs")
// everyauth.everymodule.findUserById( function (req,userId, foundUser_cb) {
//     console.log("found user");
// //  User.findById(userId, callback);
//   // callback has the signature, function (err, user) {...}
// });
// everyauth.facebook.appId('188669381307230')
//     .appSecret('a5ffd5750958c1e648265315ecf305f0')
//     .handleAuthCallbackError( function (req, res) {
//         req.data.warning("fb callback error");
//         console.log("failed callback to facebook");

    // If a user denies your app, Facebook will redirect the user to
    // /auth/facebook/callback?error_reason=user_denied&error=access_denied&error_description=The+user+denied+your+request.
    // This configurable route handler defines how you want to respond to
    // that.
    // If you do not configure this, everyauth renders a default fallback
    // view notifying the user that their authentication failed and why.
  // })
  // .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
  //     console.log("find or create user running");
  //     return 1;
  //   // find or create user logic goes here
  // })
  // .redirectPath('/')
  // .fields('id,name,email,picture')
  // everyauth.debug = true;

// function foundUser_cb(){
//     console.log("foound user");
// }

//var mongoose = require('mongoose');//no db needed for this example app
//var Schema = mongoose.Schema;
//var db_mon = mongoose.connect('mongodb://localhost/swoop', {db:{safe:false}});



// app.configure(function (){
//   app.use(express.errorHandler({dumpExceptions: true, showStack: true})); 
//   app.use(express.bodyParser());//puts params in body[property] for post, not get
//   app.use(express.query());//puts query params in body.query with either get or post
//   app.use(express.cookieParser());
//   app.use(express.methodOverride());
//   app.use(express.static(path.join(application_root, "www")));
//   app.use(everyauth.middleware());//put this here b/c in everyauth example, removed the 'app' from the params and it works, fails to load any resources othewise
// });



app.configure(function (){
  require ('./passport.js')
  app.use(express.errorHandler({dumpExceptions: true, showStack: true})); 
  app.use(express.bodyParser());//puts params in body[property] for post, not get
  app.use(express.query());//puts query params in body.query with either get or post
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(application_root, "www")));
  app.use(passport.initialize())
  // app.use(passport.session())
  // app.use(everyauth.middleware());//put this here b/c in everyauth example, removed the 'app' from the params and it works, fails to load any resources othewise
});

// app.get('/facebook', { scope: ['read_stream', 'publish_actions'] }, function (req,res) {
//   passport.authenticate("facebook", {failureRedirect: '/'})(req, res);
// })

var port = 3000;
app.listen(port, 'localhost');
console.log("listening on port " + port); 

app.get('/facebook', function (req,res ) {
  passport.authenticate('facebook', { scope: ['email', 'user_status', "user_friends"] })(req,res)
}
  
  
);
app.get('/facebook/callback', function(req,res) {
  passport.authenticate("facebook", function(err, user, info) {
    if (err){
      console.log("facebook/callback error: ",err);
      res.send(err)
    }else{
      
      var friends = user.friends.data
      user.friends = friends
      console.log("facebook user: ", user);
      res.send(user)
    }
  })(req,res)
})

app.get('/', function(req,res) {
  console.log("call index");
  fs.readFile("/www/index.html", function(err,data) {
    index = data
    res.end(index)
  })
  
})
// app.all('*', function(req,res) {
//   console.log("requested for", req.path);
// })
// app.post('/api/verifyFBConnection', function(req, res){
//     var fbTools = require('./src/fbTools');   
//     fbTools.verifyConnection(req, function(err, fbResponse){
//         console.log("fbResponse:" + JSON.stringify(fbResponse));
//     });
// });
// app.post('/api/verifyFBFriends', function(req, res){
//     var fbTools = require('./src/fbTools');   
//     fbTools.verifyFriends(req, function(err, fbResponse){
//         console.log("fbResponse:" + JSON.stringify(fbResponse));
//     });
// });
app.get('*', function(req, res){
  res.send({error:"404, how's your day going?"}, 404);
});

