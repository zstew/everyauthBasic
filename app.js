var everyauth = require('everyauth');
everyauth.everymodule.findUserById( function (req,userId, foundUser_cb) {
    console.log("found user");
//  User.findById(userId, callback);
  // callback has the signature, function (err, user) {...}
});
everyauth.facebook.appId('290649004282465')
    .appSecret('218bee2c627c2ee47f833b04d8452e6f')
    .handleAuthCallbackError( function (req, res) {
        req.data.warning("fb callback error");
        console.log("failed callback to facebook");
    // If a user denies your app, Facebook will redirect the user to
    // /auth/facebook/callback?error_reason=user_denied&error=access_denied&error_description=The+user+denied+your+request.
    // This configurable route handler defines how you want to respond to
    // that.
    // If you do not configure this, everyauth renders a default fallback
    // view notifying the user that their authentication failed and why. 
  })
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
      console.log("find or create user running");
      return 1;
    // find or create user logic goes here
  })
  .redirectPath('/')
  .fields('id,name,email,picture')
  everyauth.debug = true;
  
var application_root = __dirname,
    express = require("express"),
    path = require("path")
var url = require('url'), path = require('path');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db_mon = mongoose.connect('mongodb://localhost/swoop', {db:{safe:false}});



app.configure(function (){
  app.use(express.errorHandler({dumpExceptions: true, showStack: true})); 
  app.use(express.bodyParser());//puts params in body[property] for post, not get
  app.use(express.query());//puts query params in body.query with either get or post
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(application_root, "www")));
  app.use(everyauth.middleware());//put this here b/c in everyauth example, removed the 'app' from the params and it works, fails to load any resources othewise
});