module.exports = function(app){
    var Tasks = app.db.models.Tasks;

    console.log(Tasks);

    app.route("/tasks")
        .all(app.auth.authenticate())
//    	.all(function(req, res, next){
//    		delete req.body,id;
//    		next();
//    	})
    	.get(function(req, res){
    		console.log(arguments);
    		Tasks.findAll({
                where: { user_id: req.user.id }
            })
    			.then(function (result) {
    				console.log(result);
    				 res.json(result);
    			})
    			.catch(function (error) {
    				 /* body... */ 
    				 res.status(412).json({msg: error.message});
    			});
    	})
    	.post(function(req, res){
            req.body.user_id = req.user.id;
    		Tasks.create(req.body)
    			.then(function (result) {
    				res.json(result);
    				 /* body... */ 
    			})
    			.catch(function (error) {
    				 /* body... */ 
    				 res.status(412).json({msg: error.message});
    			});
    	});

    app.route("/tasks/:id")
        .all(app.auth.authenticate())
//    	.all(function(req, res, next){
//    		delete req.body,id;
//    		next();
//    	})
    	.get(function(req, res){
    		Tasks.findOne({where: {
                id: req.params.id
                , user_id: req.user.id
            }})
    			.then(function (result) {
    				 /* body... */ 
    				 if(result){
    				 	res.json(result);
    				 } else {
    				 	res.sendStatus(404);
    				 }
    			})
    			.catch(function(error){
    				res.status(412).json({msg:error.message});
    			});
    	})
    	.put(function(req, res){
    		Tasks.update(req.body, {where: 
                {
                    id: req.params.id
                    , user_id: req.user.id
                }
            })
    			.then(function (result) {
    				 /* body... */ 
    				 res.sendStatus(204);
    			})
    			.catch(function (error) {
    				 /* body... */ 
    				 res.status(412).json({msg:error.message});
    			});
    	})
    	.delete(function(req, res){
    		Tasks.destroy({where:
                {
                    id: req.params.id
                    , user_id: req.user.id
                }
            })
    			.then(function(result){
    				res.sendStatus(204);
    			})
    			.catch(function(error){
    				re.status(412).json({msg:error.message});
    			});
    	});
/*
    app.get("/tasks", function(req, res){
        Tasks.findAll({}).then(function(tasks){
            res.json({tasks:tasks});
        });
    }); */
};