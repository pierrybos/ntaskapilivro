var passport = require("passport");
var Strategy = require("passport-jwt");

module.exports = function(app){

	var Users = app.db.models.Users;
	var ctg = app.libs.config;

	var strategy = new Strategy({ secretOrKey: cfg.jwtSecret }, function(payload, done){
		Users.findById(payload.id)
			.then(function(user){
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
			return passport.authenticate("jwt", cfg.jwtSessao);
		}
	};
};