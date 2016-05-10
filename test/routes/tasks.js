var jwt = require('jwt-simple');

describe("Routes: Tasks", function () {
    var Users = app.db.models.Users;
    var Tasks = app.db.models.Tasks;
    var jwtSecret = app.libs.config.jwtSecret;

    var token, fakeTask;

    beforeEach(function (done) {

        Users
            .destroy({where:{}})
            .then(function(){
                Users.create({
                    name: "John"
                    , email: "john@email.net"
                    , password: "12345"
                // });
            })
            .then(function(user){
                
                Tasks.destroy({where:{}})
                    .then(function(){
                        Tasks.bulkCreate([
                            {
                                id: 1,
                                title: "Work",
                                user_id: user.id
                            }
                            , {
                                id: 2,
                                title: "Work 2",
                                user_id: user.id
                            }
                            , {
                                id: 3,
                                title: "Work 3",
                                user_id: user.id
                            }

                            // ]);
                    ])
                    // })
                    .then(function(tasks){
                        fakeTask = tasks[0];
                        token = jwt.encode({
                            id: user.id
                        }, jwtSecret);
                        done();
                    });
            });
            /* // */ });
            /* // */ });
         
    });

    describe("GET /tasks", function(){
        describe("status 200", function(){
            it("returns a list of tasks", function(done){
                request.get("/tasks")
                    .set("Authorization", "JWT " + token )
                    .expect(200)
                    .end(function(err, res){
                        expect(res.body).to.have.length(3);
                        expect(res.body[0].title).to.eql("Work");
                        expect(res.body[1].title).to.eql("Work 2");
                        expect(res.body[2].title).to.eql("Work 3");
                        console.log('error');
                        done(err);
                    })

            });
        });
    });
/**/
    describe("POST /tasks", function(){
        describe("status 200", function(){
            it("creates a new task", function(done){
                request.post("/tasks")
                .set("Authorization", "JWT " + token )
                .send({title:"Run"})
                .expect(200)
                .end(function(err, res){
                    expect(res.body.title).to.eql("Run");
                    expect(res.body.done).to.be.false;
                    done(err);
                });

            });
        });
    });

    describe("GET /tasks/:id", function(){
        describe("status 200", function(){
            it("returns one task", function(done){
                request.get("/tasks/" + fakeTask.id)
                .set("Authorization", "JWT " + token )
                .expect(200)
                .end(function(err, res){
                    expect(res.body.title).to.eql("Work");
                    done(err);
                });

            });
        });
        describe("status 404", function(){
            it("throws error when task not exist", function(done){
                request.get("/tasks/0")
                .set("Authorization", "JWT " + token )
                .expect(404)
                .end(function(err, res){
                    done(err);
                })

            });
        });
    });

    describe("PUT /tasks/:id", function(){
        describe("status 204", function(){
            it("updates a task", function(done){
                request.put("/tasks/" + fakeTask.id)
                .set("Authorization", "JWT " + token )
                .send({
                    title: "New Work",
                    done: true
                })
                .expect(204)
                .end(function(err, res){
                    // expect(res.body.title).to.eql("Work");
                    done(err);
                });
            });
        });
    });

    describe("DELETE /tasks/:id", function(){
        describe("status 204", function(){
            it("removes a task", function(done){
                request.delete("/tasks/" + fakeTask.id)
                .set("Authorization", "JWT " + token )
                .expect(204)
                .end(function(err, res){
                    // expect(res.body.title).to.eql("Work");
                    done(err);
                });

            });
        });
    });
/**/
});