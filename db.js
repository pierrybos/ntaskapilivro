var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

// var config = require("./libs/configs.js");

var db;


module.exports = function(app){
    if(!db){
        var config = app.libs.config;
        var sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
            );

    db = {
        sequelize: sequelize,
        Sequelize: Sequelize,
        models: {}
    };

    var dir = path.join(__dirname, "models");
    fs.readdirSync(dir).forEach(function(file){

        var modelDir = path.join(dir, file);
        var model = sequelize.import(modelDir);

        db.models[model.name] = model;

    });

    Object.keys(db.models).forEach(function(key){

        db.models[key].associate(db.models);

    });
    }

    return db;
};