var https = require('https');
var fs = require('fs');

module.exports = function(app){

    if(process.env.NODE_ENV !== "test"){

    	var credentials = {
    		key: fs.readFileSync("ssl/84527313-ntaks.key", "utf8"),
    		cert: fs.readFileSync("ssl/84527313-ntaks.cert", "utf8")
    	};

        app.db.sequelize.sync().done(function(){

            https.createServer(credentials, app)
            .listen(app.get("port"), function(){
                console.log("NTask API - porta : " + app.get("port"));
            });

        });
    }
};