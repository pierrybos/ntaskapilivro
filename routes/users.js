module.exports = function(app){

var Users = app.db.models.Users;

/**
* @api {get} /user Exibe usuário autenticado
* @apiGroup Usuario
* @apiHeader {String} Authorization Token de usuário
* @apiHeaderExample {json} Header
* {"Authorization": "JWT xyz.abc.123.hgf"}
* @apiSuccess {Number} id Id de registro
* @apiSuccess {String} name Nome
* @apiSuccess {String} email Email
* @apiSuccessExample {json} Sucesso
* HTTP/1.1 200 OK
* {
* "id": 1,
*
" name": "John Connor",
*
" email": "john@connor.net"
* }
* @apiErrorExample {json} Erro de consulta
* HTTP/1.1 412 Precondition Failed
*/
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

/**
* @api {delete} /user Exclui usuário autenticado
* @apiGroup Usuario
* @apiHeader {String} Authorization Token de usuário
* @apiHeaderExample {json} Header
*
{"Authorization": "JWT xyz.abc.123.hgf"}
* @apiSuccessExample {json} Sucesso
*
HTTP/1.1 204 No Content
* @apiErrorExample {json} Erro na exclusão
*
HTTP/1.1 412 Precondition Failed
*/

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


/**
* @api {post} /users Cadastra novo usuário
* @apiGroup Usuario
* @apiParam {String} name Nome
* @apiParam {String} email Email 
* @apiParam {String} password Senha
* @apiParamExample {json} Entrada
* {
* "name": "John Connor",
* "email": "john@connor.net",
* "password": "123456"
* }
* @apiSuccess {Number} id Id de registro
* @apiSuccess {String} name Nome
* @apiSuccess {String} email Email
* @apiSuccess {String} password Senha criptografada
* @apiSuccess {Date} updated_at Data de atualização
* @apiSuccess {Date} created_at Data de cadastro
* @apiSuccessExample {json} Sucesso
* HTTP/1.1 200 OK
* {
* "id": 1,
* "name": "John Connor",
* "email": "john@connor.net",
* "password": "$2a$10$SK1B1",
* "updated_at": "2015-09-24T15:46:51.778Z",
* "created_at": "2015-09-24T15:46:51.778Z"
* }
* @apiErrorExample {json} Erro no cadastro
* HTTP/1.1 412 Precondition Failed
*/

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