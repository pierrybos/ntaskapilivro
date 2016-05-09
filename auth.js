var passport = require("passport");
var Strategy = require("passport-jwt")["Strategy"];
var ExtractJwt = require("passport-jwt")["ExtractJwt"];

module.exports = function(app){

	var Users = app.db.models.Users;
	var cfg = app.libs.config;

	var params = { 
		secretOrKey: cfg.jwtSecret 
		, jwtFromRequest: ExtractJwt.fromAuthHeader()
	};

	var strategy = new Strategy(params, function(payload, done){
		Users.findById(payload.id)
			.then(function(user){

				console.log(user);
				for(var prop in user){
						console.log(prop);
						console.log(user[prop]);
					}
			console.log(user.id);
			console.log(user.email);

				if(user){
					return done(null, {id: user.id, email: user.email})
				}
				return done(null, false);
			})
			.catch(function(error){
				return done(error, null)
			});

	});

	passport.use(strategy);

	return {
		initialize: function(){
			return passport.initialize();
		}
		, authenticate: function(){
			return passport.authenticate("jwt", cfg.jwtSession);
		}
	};
};