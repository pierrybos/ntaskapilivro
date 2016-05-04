var bodyParser = require('body-parser');

module.exports = function(app){
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use(function (req, res, next) {
    	 /* body... */ 
    	 delete req.body.id;
//    	 console.log(arguments);
    	 next();
    });
};