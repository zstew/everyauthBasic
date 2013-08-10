passport = require("passport")
FacebookStrategy = require("passport-facebook").Strategy
var https = require('https');

getFbData = function(accessToken, apiPath, callback) {
    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: apiPath + '?access_token=' + accessToken, //apiPath example: '/me/friends'
        method: 'GET'
    };

    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });
    });

    request.on('error', function(e){
        console.log('error from facebook.getFbData: ' + e.message)
    });

    request.end();
}

passport.use(new FacebookStrategy({
  clientID: "188669381307230",
  clientSecret: "a5ffd5750958c1e648265315ecf305f0",
  callbackURL: "http://localhost:3000/facebook/callback",
  profileURL: "https://graph.facebook.com/me?fields=email,friends,name"
}, function(accessToken, refreshToken, profile, done) {
	if (!profile){
		return done("token expires or wrong login", null)
	}else{
		console.log(profile._json);
		return done(null, profile._json)
		// fr = {}
		// getFbData(refreshToken, '/me/friends', function(data) {
		// 	fr = data.friends
		// })
		// console.log(fr);
		// console.log("profile!: ", profile);
		// console.log("facebook user profile: ", profile._json);
		

	}

}));