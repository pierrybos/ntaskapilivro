module.exports = function(app){

var Users = app.db.models.Users;


app.route("/user")
.all(app.auth.authenticate())
.get(function(req, res){
	Users.findById(req.user.id, {
		attributes: ["id", "name", "email"]
	})
	.then(function(result){
		res.json(result);
	})
	.catch(function(error){
		res.status(412).json({msg: error.message});
	});
})
.delete(function(req, res){
	Users.destroy({
		where: {
			id: req.user.id
		} })
	.then(function(result){
		res.sendStatus(204);
	})
	.catch(function(error){
		res.status(412).json({msg: error.message});
	});
});

app.post("/users", function(req, res){
	Users.create(req.body)
	.then(function(result){
		res.json(result);
	})
	.catch(function(error){
		res.status(412).json({msg: error.message});
	});
});

};