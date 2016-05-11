var jwt = require("jwt-simple");

module.exports = function(app){

	var cfg = app.libs.config;

	var Users = app.db.models.Users;



/**
* @api {post} /token Token autenticado
* @apiGroup Credencial
* @apiParam {String} email Email de usuário
* @apiParam {String} password Senha de usuário
* @apiParamExample {json} Entrada
* {
*     "email": "john@connor.net",
*     "password": "123456"
* }
* @apiSuccess {String} token Token de usuário autenticado
* @apiSuccessExample {json} Sucesso
* HTTP/1.1 200 OK
* {"token": "xyz.abc.123.hgf"}
* @apiErrorExample {json} Erro de autenticação
* HTTP/1.1 401 Unauthorized
*/

	app.post("/token", function(req, res){

		if(req.body.email && req.body.password) {
			var email = req.body.email;
			var password = req.body.password;

			Users.findOne({where: {email: email } })
				.then(function(user){
					if(Users.isPassword(user.password, password)){
						var payload = {id: user.id};
						res.json({
							token: jwt.encode(payload, cfg.jwtSecret)
						});
					} else {
						res.sendStatus(401);
					}
				})
				.catch(function(error){
					res.sendStatus(401);
				});

		} else {

			res.sendStatus(401);
		}
	});

};