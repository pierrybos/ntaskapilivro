var express = require("express");
var consign = require("consign");


var app = express();


consign()
    .include("libs/configs.js")
    .then("db.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);

// app.get("/", function(req, res){

//     res.json({status: "NTask API"});

// });



// app.get("/tasks", function(req, res){

//     res.json(
//         {
//             tasks:[
//             {title:"comprar"},
//             {title:"estudar"}
//             ]
//         }
//         );
        

// });




// app.listen(PORT, function () {
//      console.log('ouvindo na porta '+ PORT);
// });