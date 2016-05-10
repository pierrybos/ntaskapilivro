describe("Routes: Token", function(){
    var Users = app.db.models.Users;

    describe("POST /token", function(){
        beforeEach(function(done){
            Users
                .destroy({where:{}})
                .then(function(){
                    Users.create({
                        name:"John",
                        email:"john@email.net",
                        password:"12345"
                    })
                })
                .then(done());
        });
        describe("status 200", function(){
            it("returns authenticated user token", function(done){
                request.post("/token")
                    .send({
                        email: "john@email.net",
                        password:"12345"
                    })
                    .expect(200)
                    .end(function(err, res){
                        expect(res.body).include.keys("token");
                        done(err);
                    });
            });
        });

        describe("status 401", function(){
            it("throws error when password is incorrect", function(done){
                request.post("/token")
                    .send({
                        email: "john@email.net",
                        password:"errada"
                    })
                    .expect(401)
                    .end(function(err, res){
                        // expect(res.body).include.keys("token");
                        done(err);
                    });
            });
            it("throws error when email not exist", function(done){
                request.post("/token")
                    .send({
                        email: "ERROjohn@email.net",
                        password:"errada"
                    })
                    .expect(401)
                    .end(function(err, res){
                        // expect(res.body).include.keys("token");
                        done(err);
                    });

            });
            it("throws error when email and papssword are blank", function(done){
                request.post("/token")
                    // .send({
                    //     email: "john@email.net",
                    //     password:"errada"
                    // })
                    .expect(401)
                    .end(function(err, res){
                        // expect(res.body).include.keys("token");
                        done(err);
                    });

            });
        });
    });
});