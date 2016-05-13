var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var compression = require('compression');
var helmet = require('helmet');
var logger = require('./logger.js');

module.exports = function(app){
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(morgan("common", {
    	stream: {
    		write: function(message){
    			logger.info(message);
    		}
    	}
    }));
    app.use(helmet());
    app.use(cors({
        origin: ["http://localhost:3001", "http://localhost:3000", "https://localhost:3001", "https://localhost:3000"],
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use(function (req, res, next) {
    	 /* body... */ 
    	 delete req.body.id;
//    	 console.log(arguments);
    	 next();
    });
    app.use(express.static("public"))
};