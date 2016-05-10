module.exports = function(app){

    if(process.env.NODE_ENV !== "test"){

        app.db.sequelize.sync().done(function(){

            app.listen(app.get("port"), function(){
                console.log("NTask API - porta : " + app.get("port"));
            });

        });
    }
};