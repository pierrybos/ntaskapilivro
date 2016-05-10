describe("Routes: Index", function(){
    describe("GET /", function(){
        it("returns the api status", function(done){
            request.get("/")
                .expect(200)
                .end(function(err, res){
                    var expected = {status: "NTask API"};
                    expect(res.body).to.eql(expected);
                    done(err);
                });
        });
    });
});