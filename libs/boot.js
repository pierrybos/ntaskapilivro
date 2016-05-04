module.exports = function(app){

    app.db.sequelize.sync().done(function(){

        app.listen(app.get("port"), function(){
            console.log("NTask API - porta : " + app.get("port"));
        });

    });
};